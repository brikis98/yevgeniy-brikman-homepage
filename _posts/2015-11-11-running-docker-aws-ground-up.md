---
layout: post
title: "Running Docker on AWS from the ground up"
tags:
- DevOps
- Software Engineering
thumbnail_path: blog/aws-docker/docker-on-aws.png
---

[Docker](https://www.docker.com/) is an awesome tool. In a
[previous post](https://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/),
I showed how you can use it to package your code so that it runs exactly the
same way in development and in production. But how, exactly, do you run Docker
in production? Most of the articles I found online assume you're already an
expert in both Docker deployment and cloud providers. They don't take the time
to explain their ideas from first principles and instead dive straight into
jargon like clusters, auto scaling groups, scheduling, nodes, orchestration,
PaaS, IaaS, and so on.

{% include figure.html path=page.thumbnail_path alt="Docker on AWS" %}

In this post, I'm going to introduce Docker deployment from the ground up, using
[Amazon Web Services](https://aws.amazon.com/) (AWS) for hosting. I picked AWS
because it's incredibly popular, offers a [free tier](https://aws.amazon.com/free/)
you can use to try this tutorial at no cost, and provides first-class Docker
support via the [EC2 Container Service](https://aws.amazon.com/ecs/) (ECS). It
took me longer than I want to admit to get Docker working on AWS, in no small
part because the AWS docs use a lot of jargon (although
[Amazon Web Services in Plain English](https://www.expeditedssl.com/aws-in-plain-english)
does help), so my goal is to make this tutorial accessible to both AWS
deployment newbies and Docker deployment newbies (note: if you're a Docker
*development* newbie, you should first read
[A productive development environment with Docker on OS X](https://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/)).
Once you're done with this post, check out [Infrastructure as code: running microservices on AWS using Docker,
Terraform, and ECS](https://www.ybrikman.com/writing/2016/03/31/infrastructure-as-code-microservices-aws-docker-terraform-ecs/)
for a discussion of how to automate this deployment process.

I'll start the tutorial by showing the most basic way of manually deploying a
Docker container on a single server in AWS, then talk about how to manage
multiple servers and containers using ECS, and finally, discuss the advantages
and disadvantages of ECS, as well as possible alternatives. It's a fairly long
post, so here is the table of contents so you can jump to the section you're
interested in:

<ol>
  <li class="h6 tight-line-height">
    <a href="#deploying-docker-containers-manually">Deploying Docker containers manually</a>
    <ol class="mb0">
      <li class="h6 tight-line-height"><a href="#launching-an-ec2-instance">Launching an EC2 Instance</a></li>
      <li class="h6 tight-line-height"><a href="#installing-docker">Installing Docker</a></li>
    </ol>
  </li>
  <li class="h6 tight-line-height">
    <a href="#deploying-docker-containers-on-ecs">Deploying Docker containers on ECS</a>
    <ol class="mb0">
      <li class="h6 tight-line-height"><a href="#creating-an-elb">Creating a Cluster</a></li>
      <li class="h6 tight-line-height"><a href="#creating-an-elb">Creating an ELB</a></li>
      <li class="h6 tight-line-height"><a href="#creating-iam-roles">Creating IAM Roles</a></li>
      <li class="h6 tight-line-height"><a href="#creating-an-auto-scaling-group">Creating an Auto Scaling Group</a></li>
      <li class="h6 tight-line-height"><a href="#running-docker-containers-in-your-cluster">Running Docker containers in your Cluster</a></li>
      <li class="h6 tight-line-height"><a href="#update-docker-containers-in-your-ecs-cluster">Update Docker containers in your ECS Cluster</a></li>
    </ol>
  </li>
  <li class="h6 tight-line-height"><a href="#advantages-of-ecs">Advantages of ECS</a></li>
  <li class="h6 tight-line-height"><a href="#disadvantages-of-ecs">Disadvantages of ECS</a></li>
  <li class="h6 tight-line-height"><a href="#conclusion">Conclusion</a></li>
</ol>

## Deploying Docker containers manually

Let's start by manually firing up a server in AWS, manually installing Docker on
it, and manually running a Docker container on it. For this tutorial, the Docker
image I'm going to use is [training/webapp](https://hub.docker.com/r/training/webapp/),
which you can use to fire up a simple web server that listens on port 5000 and
responds with `Hello, World`:

{% highlight text %}
> docker run -d -p 5000:5000 training/webapp:latest python app.py
> curl http://dockerhost:5000
Hello world!
{% endhighlight %}

How do you run this Docker image on AWS? Well, first you need a server. To do
that, you can use the AWS [Elastic Compute Cloud](https://aws.amazon.com/ec2/)
(EC2). EC2 makes it easy to boot a virtualized server&mdash;called an
*EC2 Instance*&mdash;with just a few clicks.

### Launching an EC2 Instance

Log into your [AWS Console](https://console.aws.amazon.com/console/home), click
the EC2 link to go to the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home),
and click the blue "Launch Instance" button:

{% include figure.html path="blog/aws-docker/ec2-dashboard.png" caption="EC2 Dashboard" link_to_full_size_image=true %}

On the next page, you need to pick an
[Amazon Machine Image](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
(AMI) to run on your EC2 Instance. The AMI contains the software configuration
(operating system, application server, and applications) that will be launched
on your server. AWS offers many free and paid options, such as AMIs with
Ubuntu, Windows, or MySQL pre-installed. For this tutorial, just pick the top
option, which is the `Amazon Linux AMI`:

{% include figure.html path="blog/aws-docker/linux-ami.png" caption="Pick an AMI" link_to_full_size_image=true %}

Next, you need to pick the [Instance Type](https://aws.amazon.com/ec2/instance-types/),
which determines what kind of CPU, memory, storage, and network capacity your
server will have. Stick with the default option, `t2.micro`, and click the
gray "Next: Configure Instance Details" button:

{% include figure.html path="blog/aws-docker/instance-type.png" caption="Pick an Instance Type" link_to_full_size_image=true %}

You can keep the default options for Instance Details, Storage, and Tags, so
keep clicking the gray "Next" button until you get to the "Configure Security
Group" page. A [Security Group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html)
is a set of firewall rules that control network traffic for your instance. By
default, all incoming ports are blocked, so use this page to add rules that
allow incoming SSH (TCP, port 22) and HTTP (TCP, port 80) requests from any
source (`0.0.0.0/0`). Give the Security Group a name such as
`ssh-and-http-from-anywhere`, and click the blue "Review and Launch" button:

{% include figure.html path="blog/aws-docker/security-group.png" caption="Configure security group" link_to_full_size_image=true %}

On the "Review Instance Launch" page, click the blue "Launch" button. This will
pop up a modal that asks you to pick a
[Key Pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html).
A key pair consists of a public key and a private key file that you can use to
connect to your EC2 Instance over SSH. Select "create a new key pair" from the
drop-down, give the Key Pair a name like `my-ec2-key-pair`, and click "Download
Key Pair":

{% include figure.html path="blog/aws-docker/create-key-pair.png" caption="Create and download a Key Pair" link_to_full_size_image=true %}

Save the Key Pair `.pem` file to a safe and accessible location on your
computer (once you close this modal, you will never be able to download this
`.pem` file again, so make sure to save it!). Now, click the blue "Launch
Instances" button in the bottom right of the modal. This takes you to a "Launch
Status" page. Click the blue "View Instances" button in the bottom right of
this page, and you'll be taken to the EC2 Instances page:

{% include figure.html path="blog/aws-docker/ec2-instances.png" caption="EC2 Instances" link_to_full_size_image=true %}

This page shows all the EC2 Instances you have running. Click on your newly
created EC2 Instance to see more information about it in the section at the
bottom of the page, such as its state (running, pending, or terminated), launch
time, and public IP address. Copy the public IP address, as you'll need it to
SSH to the server and install Docker.

### Installing Docker

The next step is to install Docker on your EC2 Instance. Open a terminal,
`cd` over to the folder where you saved your Key Pair, and run the following
commands:

{% highlight text %}
> cd ~/my-aws-key-pairs
> chmod 400 my-ec2-key-pair.pem
> ssh -i my-ec2-key-pair.pem ec2-user@<EC2-INSTANCE-PUBLIC-IP-ADDRESS>
{% endhighlight %}

If you did everything correctly, you should see something like this:

{% highlight text %}

       __|  __|_  )
       _|  (     /   Amazon Linux AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-ami/2015.09-release-notes/
[ec2-user]$
{% endhighlight %}

You are now in control of a fully working Linux server running in the AWS cloud.
Let's install Docker on it.

{% highlight text %}
[ec2-user]$ sudo yum update -y
[ec2-user]$ sudo yum install -y docker
[ec2-user]$ sudo service docker start
{% endhighlight %}

Next, add the `ec2-user` to the `docker` group so you can execute Docker
commands without using `sudo`. Note that you'll have to log out and log back
in for the settings to take effect:

{% highlight text %}
[ec2-user]$ sudo usermod -a -G docker ec2-user
[ec2-user]$ exit

> ssh -i my-ec2-key-pair.pem ec2-user@<EC2-INSTANCE-PUBLIC-IP-ADDRESS>

[ec2-user]$ docker info
{% endhighlight %}

If you did everything correctly, the last command, `docker info`, will return
lots of information about your Docker install without any errors.

Finally, you can run the `training/webapp` image:

{% highlight text %}
[ec2-user]$ docker run -d -p 80:5000 training/webapp:latest python app.py
{% endhighlight %}

The `-p 80:5000` flag in the command above tells Docker to link port 5000 on
the Docker container to port 80 on the EC Instance. You can test that the
Docker image is running as follows:

{% highlight text %}
[ec2-user]$ curl http://localhost
Hello world!
{% endhighlight %}

Since the Security Group for this EC2 Instance exposed port 80 to the world,
you can also connect to the public IP address of your EC2 Instance from any
web browser:

{% include figure.html path="blog/aws-docker/browser-test.png" caption="Testing the EC2 Instance from the browser" link_to_full_size_image=true %}

If you see the `Hello world!` text, then the good news is that you are
successfully running a Docker container in the AWS cloud. The bad news is that
launching Docker containers using this manual process has a number of drawbacks:

1. **Automation**. In the example above, you deployed just a single Docker
   container to a single EC2 Instance. What happens if you have many different
   Docker containers (e.g., one container for a front-end web app, another for
   a back-end, another for a database, and so on) and you have to deploy
   multiple copies of each of those containers across many EC2 Instances? You
   wouldn't want to repeat all of these manual steps over and over again, so
   you need a way to automate deployment.
2. **Integration**. Running a Docker container is only one piece of the puzzle.
   You also need to integrate it with all the other parts of your
   infrastructure, such as routing traffic to your containers (load balancing)
   and ensuring the your containers continue running (monitoring, alerting,
   crash recovery).

One way to solve both of these problems is to use the
[EC2 Container Service](https://aws.amazon.com/ecs/) (ECS).

## Deploying Docker containers on ECS

The idea behind ECS is that you create an *ECS Cluster*&mdash;which is a group
of EC2 Instances managed by ECS&mdash;define what Docker containers you want to
run, and ECS will take care of deploying those containers across the Cluster,
rolling out new versions, and integrating with other AWS infrastructure.
ECS can make it easier to manage multiple Docker containers running on multiple
EC2 Instances&mdash;*if* you can figure out all the steps required to use it.
These steps are:

1. Create an ECS Cluster
2. Create an ELB
3. Create IAM Roles
4. Create an Auto Scaling Group
5. Run Docker containers in your ECS Cluster
6. Update Docker containers in your ECS Cluster

To understand what all of these steps mean and how to do them, let's walk
through an example.

### Creating a Cluster

Open up your [AWS Console](https://console.aws.amazon.com/console/home) and
click on the EC2 Container Service link to go to the
[ECS Console](https://console.aws.amazon.com/ecs/home). If this is your first
time using ECS, you will be taken to a getting started page. Click the blue
"Get started" button:

{% include figure.html path="blog/aws-docker/ecs-welcome.png" caption="ECS Get Started" link_to_full_size_image=true %}

This takes you to a wizard that walks you through the process of using ECS, but
I found the wizard confusing, and as you'll never be able to use the wizard
again after this first time, it also doesn't teach you how to use the actual
ECS UI. Therefore, I recommend clicking the cancel button in the bottom right
corner:

{% include figure.html path="blog/aws-docker/ecs-tutorial.png" caption="Click cancel to get out of the ECS wizard" link_to_full_size_image=true %}

This takes you to the Clusters page in the normal ECS UI. To create a Cluster,
click the blue "Create Cluster" button:

{% include figure.html path="blog/aws-docker/create-cluster.png" caption="Create ECS Cluster" link_to_full_size_image=true %}

Give the cluster a name, such as `my-ecs-cluster`, click the blue "Create"
button, and your new Cluster will show up on the Clusters page:

{% include figure.html path="blog/aws-docker/ecs-clusters.png" caption="Your new ECS Cluster" link_to_full_size_image=true %}

Notice how your Cluster shows zero "Registered Container Instances". You need to
create a bunch of new EC2 Instances and register them in the Cluster. Deploying,
monitoring, and updating many EC2 Instances manually is tedious and error
prone. A better solution is to use an *Auto Scaling Group* and an
*Elastic Load Balancer*.

You can define an [Auto Scaling Group](https://aws.amazon.com/autoscaling/) to
automatically launch multiple EC2 Instances based on rules you define. For
example, you could define rules like "keep 5 EC2 Instances running at all times"
or "always maintain a minimum of 3 EC2 Instances, but add one every time the
CPU load is above 90% for more than 15 minutes, and remove one every time the
CPU load drops below 30% for more than 15 minutes" (you can feed the Auto
Scaling Group information about the CPU load and other metrics from Amazon's
[CloudWatch](https://aws.amazon.com/cloudwatch/) service).

You can use an [Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/)
(ELB) when you are running multiple EC2 Instances and you want to distribute
load between them. The ELB monitors the health of your EC2 Instances, so if one
goes down (due to a crash or an Auto Scaling Group reducing the number of
instances) it can take it out of rotation or if a new one comes up (due to a
new deployment or an Auto Scaling Group increasing the number of instances) it
can add it to the rotation. Your users always send their requests to the ELB,
so they are shielded from any changes within your data center.

Let's create the ELB first and then move on to the Auto Scaling Group.

### Creating an ELB

To create an ELB, open the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home)
(mouse over the "Services" menu at the top and click "EC2"), click the "Load
Balancers" link in the bottom left, and click the blue "Create Load Balancer"
button:

{% include figure.html path="blog/aws-docker/create-load-balancer.png" caption="Create a Load Balancer" link_to_full_size_image=true %}

Give the ELB a name such as `ecs-load-balancer` and take a look at the "Listener
Configuration" settings. The ELB can only route traffic from one port to
another, such as routing all HTTP traffic that it gets on port 80 to port 80 of
any EC2 Instances you attach to it. This limited feature set can be a problem,
as we'll discuss towards the end of the blog post. However, this configuration
will work for our example, so leave those settings as-is and click the gray
"Next: Assign Security Groups" button:

{% include figure.html path="blog/aws-docker/load-balancer-basic-config.png" caption="Give the Load Balancer a name" link_to_full_size_image=true %}

On the next page, click the "Select an existing security group" radio button,
click the checkbox next to the Security Group you created earlier
(`ssh-and-http-from-anywhere`), and click the gray "Next: Configure Security
Settings" button:

{% include figure.html path="blog/aws-docker/load-balancer-security-settings.png" caption="Select the Security Group you created earlier" link_to_full_size_image=true %}

Ignore the warning (we aren't using SSL in this example) and click the gray
"Next: Configure Health Check" button. The ELB uses a
[Health Check](http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/elb-healthchecks.html)
to periodically check if the EC2 Instances its routing to are actually up and
running. It does this by sending a *Ping* (usually, an HTTP request) to a
configurable URL on each EC2 Instance at a configurable interval. If the EC2
Instance responds with a 200 OK within a configurable period of time, it is
considered healthy; if it doesn't, it is taken out of the ELB's rotation until
future Pings mark it as healthy. For this tutorial, set the *Ping Path* to `/`
(the only URL our Docker container knows how to handle) and click the gray
"Add EC2 Instances" button:

{% include figure.html path="blog/aws-docker/load-balancer-health-check.png" caption="Set the Health Check Ping Path to /" link_to_full_size_image=true %}

On the next page, you can manually add EC2 Instances to the ELB, but we're going
to add Instances a different way (using an Auto Scaling Group), so skip this
for now by clicking the gray "Next: Add Tags" button, then the blue "Review
and Create" button, and finally, the blue "Create" button. Once the ELB is
created, click the blue "Close" button on the confirmation page and you should
see your new ELB in the list:

{% include figure.html path="blog/aws-docker/load-balancer-new.png" caption="Your newly created ELB" link_to_full_size_image=true %}

Before creating the Auto Scaling Group, we need to take a brief aside to deal
with security in the form of IAM Roles.

### Creating IAM Roles

[IAM](https://aws.amazon.com/iam/), which stands for Identity and Access
Management, is the mechanism AWS uses to:

1. Define [Identities](http://docs.aws.amazon.com/IAM/latest/UserGuide/id.html),
   such as a User, Group, or Role (authentication).
2. Define [Permissions and Policies](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html)
   that specify what an Identity is or isn't allowed to do (authorization).

For example, later in this post, you are going to create a bunch of EC2
Instances that, when they boot up, need to register themselves in your ECS
Cluster. By default, your EC2 Instances do not have the Permissions to talk to
an ECS Cluster, so you need to create an
[IAM Role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)&mdash;an
Identity with set of Permissions&mdash;and attach it to your EC2 Instances
(for more info, see [Amazon ECS Container Instance IAM Role](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html)).

Head over to the [IAM Console](https://console.aws.amazon.com/iam/home) (you
can mouse over the "Services" menu and click the "IAM" link), click the "Roles"
link on the left side, and click the blue "Create New Role" button:

{% include figure.html path="blog/aws-docker/iam-roles.png" caption="Create an IAM Role" link_to_full_size_image=true %}

Give the role a name, such as `ecs-instance-role`, and click the blue "Next
Step" button in the bottom right. From the "AWS Service Roles" list, click
the gray "Select" button next to `Amazon EC2`:

{% include figure.html path="blog/aws-docker/iam-role-type.png" caption="Select the Amazon EC2 Service Role" link_to_full_size_image=true %}

On the next page, search for `AmazonEC2ContainerServiceforEC2Role` (this
is a pre-defined Policy that has all the Permissions you need), click
the checkbox next to `AmazonEC2ContainerServiceforEC2Role`, and click the blue
"Next Step button":

{% include figure.html path="blog/aws-docker/ecs-container-role.png" caption="Check AmazonEC2ContainerServiceforEC2Role" link_to_full_size_image=true %}

Click the blue "Create Role" button and you should see your new IAM Role in the
list:

{% include figure.html path="blog/aws-docker/new-ecs-role.png" caption="The new IAM Role" link_to_full_size_image=true %}

You need to create a similar IAM Role to allow the ECS Cluster to talk to your
ELB so it can notify the ELB when it is deploying or undeploying Docker containers
(see [Amazon ECS Service Scheduler IAM Role](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_IAM_role.html)
for more info). Click the blue "Create New Role" button again, give the role a
name such as `ecs-service-role`, and click the blue "Next Step" button in the
bottom right. From the "AWS Service Roles" list, click the gray "Select" button
next to `Amazon EC2 Container Service Role`:

{% include figure.html path="blog/aws-docker/ecs-service-role.png" caption="Select the Amazon EC2 Container Service Role" link_to_full_size_image=true %}

Click the checkbox next to the `AmazonEC2ContainerServiceRole` (another
pre-defined Policy, and the only one in the list), click the blue "Next Step"
button in the bottom right, and then click the blue "Create Role" button. You
should now have two IAM roles:

{% include figure.html path="blog/aws-docker/two-iam-roles.png" caption="The EC2 Instance Role and the ECS Service Role" link_to_full_size_image=true %}

With all that out of the way, you can finally create your Auto Scaling Group.

### Creating an Auto Scaling Group

To create an Auto Scaling Group, open the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home)
(mouse over the "Services" menu at the top and click "EC2"), click the "Auto
Scaling Groups" link in the bottom left, and click the blue "Create Auto Scaling
Group" button:

{% include figure.html path="blog/aws-docker/create-auto-scaling-group.png" caption="Create an Auto Scaling Group" link_to_full_size_image=true %}

The first step in creating an Auto Scaling Group is to define a
[Launch Configuration](http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/LaunchConfiguration.html).
This is a reusable template that defines what kind of EC2 Instances the Auto
Scaling Group should launch, including the AMI, instance type, security group,
and all the other details you saw when launching an EC2 Instance manually in
the first part of this tutorial. Click the blue "Create launch configuration"
button in the bottom-right corner to go to the AMI selection page. Instead of
using the Amazon Linux AMI as before, click the "AWS Marketplace" tab on the
left, search for `ECS`, and select the `Amazon ECS-Optimized Amazon Linux AMI`
(don't worry, it's part of the AWS free tier):

{% include figure.html path="blog/aws-docker/ecs-ami.png" caption="Use the Amazon ECS-Optimized Amazon Linux AMI" link_to_full_size_image=true %}

*(Note, if this is your first time using the AWS Marketplace, you may have to
accept the terms of service, as mentioned in
[this comment by Petri Sirkkala](https://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/#comment-2360691785).)*

This Amazon ECS-Optimized Amazon Linux AMI includes the
[ECS Container Agent software](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_agent.html)
that knows how to register this EC2 Instance in your ECS Cluster. How
convenient! The only thing it needs is the name of your ECS Cluster, which we'll
get to in just a moment. On the next page, select `t2.micro` as
the instance type, and click the gray "Next: Configure details" button. Give
the Launch Configuration a name, such as `ecs-launch-configuration`, select
the instance IAM Role you created earlier from the drop-down list
(`ecs-instance-role`), and then click the "Advanced Details" link to open up
the bottom section. Find the text box labeled "User data" and enter the
following shell script into it:

{% highlight bash %}
#!/bin/bash

echo ECS_CLUSTER=my-ecs-cluster > /etc/ecs/ecs.config
{% endhighlight %}

[User data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts)
is a place you can put custom shell scripts that the EC2 Instance
will run right after booting. The shell script above puts the name of your
ECS Cluster (`my-ecs-cluster`, in this example) into the `/etc/ecs/ecs.config`
file. The ECS Container Agent knows to look into this file, so this is how you
provide it the name of your ECS Cluster. If you don't specify a name, the
Agent will use `Default` (see
[Amazon ECS Container Agent Configuration](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html)
for more info). Your Launch Configuration should look something like this:

{% include figure.html path="blog/aws-docker/launch-config-details.png" caption="Name the launch configuration and use your newly created IAM Role" link_to_full_size_image=true %}

Click the gray "Next: Add Storage" button, leave all the default Storage
configuration options, and click the gray "Next: Configure Security Group
button". On the next page, click the "Select an existing security
group" radio button, click the checkbox next to the Security Group you
created earlier (`ssh-and-http-from-anywhere`), and click the blue "Review"
button:

{% include figure.html path="blog/aws-docker/launch-config-security-group.png" caption="Use the Security Group you created earlier" link_to_full_size_image=true %}

Now click the blue "Create launch configuration button" and a modal will pop up
asking you to select a Key Pair. Select "Choose an existing key pair" from the
first drop-down box, select the Key Pair you created earlier
(`my-ec2-key-pair`) from the second drop-down, click the "I acknowledge that
I have access to the selected private key file..." checkbox, and click the blue
"Create launch configuration" button:

{% include figure.html path="blog/aws-docker/launch-config-key-pair.png" caption="Use the Key Pair you created earlier" link_to_full_size_image=true %}

Now that you've created a Launch Configuration, AWS should take you to a screen
that is prompting you to create an Auto Scaling Group from that Launch
Configuration. Give the Auto Scaling Group a name, such as
`ecs-auto-scaling-group` and specify a Group size of 5, which will tell the
Auto Scaling Group to initially launch 5 EC2 Instances.

Next, you need to pick what Subnet(s) to use. A
[Subnet](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html)
is a range of IP addresses used to segregate AWS Resources (such as your EC2
Instances) from each other or from the public Internet. For example, you might
put your front-end App Servers in a *Public Subnet*, with rules that make it
accessible from the public Internet and you might put your databases in a
*Private Subnet*, with rules that make it *only* accessible from the App Servers
but not the public Internet or anywhere else. AWS also uses different Subnets
for different Availability Zones. AWS has data centers in different locations
all over the world. Each location is composed of different
[Regions and Availability Zones](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html),
where a Region represents a geographical area (e.g., `us-east-1` and `eu-west-1`)
and an Availability Zone is an isolated location within a Region (e.g.,
`us-east-1a`, `us-east-1b`, `us-east-1c`).

Subnets, Regions, and Availability Zones are all large topics of their own, so
I won't cover them here, but you may want to read the
[AWS VPC](https://aws.amazon.com/vpc/) and
[Regions and Availability Zones](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
documentation for more info. For now, pick any of the default Subnets from the
drop-down list, and the Auto Scaling Group will deploy your EC2 Instances
across them. The page should look something like this:

{% include figure.html path="blog/aws-docker/auto-scaling-basic-config.png" caption="Give the Auto Scaling Group a name, a size of 5, and a couple Subnets" link_to_full_size_image=true %}

Click the gray "Next: Configure scaling polices" button. On the next page, you
could configure rules for how to change the number of EC2 Instances in the Auto
Scaling Group, but for this tutorial, you can leave the group at its initial
size of 5, so just skip this section and click the blue "Review" button,
followed by the blue "Create Auto Scaling Group" button. Once your Auto Scaling
Group has been created, click the blue "Close" button on the confirmation
screen and you should see your Auto Scaling Group in the list:

{% include figure.html path="blog/aws-docker/new-auto-scaling-group.png" caption="Your newly created Auto Scaling Group" link_to_full_size_image=true %}

Initially, the Auto Scaling Group will show 5 "Desired Instances", but 0
actually launched Instances. If you wait a minute and refresh the list, the
number of launched Instances will go to 5. Head back to the
[ECS Console](https://console.aws.amazon.com/ecs/home), and you should now see
five "Registered Container Instances" in your ECS Cluster:

{% include figure.html path="blog/aws-docker/ecs-cluster-registered.png" caption="Your ECS Cluster should now have 5 registered instances" link_to_full_size_image=true %}

### Running Docker containers in your Cluster

Now that you have a working Cluster, you can finally run some Docker containers
in it. To do that, you first have to create an
[ECS Task](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_defintions.html),
which defines the Docker image(s) to run, the resources (CPU, memory, ports)
you need, what volumes to mount, etc. Click the "Task Definitions" link on the
left and then the blue "Create new Task Definition" button:

{% include figure.html path="blog/aws-docker/create-task.png" caption="Create a new ECS Task" link_to_full_size_image=true %}

Give the Task a name, such as `hello-world-task` and click the "Add Container
Definition" link. In the section that slides out, specify the Container name
(e.g., `hello-world-container`), the Docker image to run
(`training/webapp:latest`), the amount of memory to allocate (128 is plenty for
this tutorial), the port mapping (map port 80 on the host to port 5000 in the
Docker container), and click the blue "Add" button:

{% include figure.html path="blog/aws-docker/task-definition.png" caption="Task definition" link_to_full_size_image=true %}

Click the blue "Create" button to create the Task. Now it's time to run the
Task in your Cluster. Click on the "Clusters" link in the menu on the left and
then click on the name of your Cluster (`my-ecs-cluster`). There are two ways
to run Tasks:

1. **One-off tasks**. This is useful for a Task that runs once to completion and
   exits. See the "Tasks" tab in your Cluster.
2. **Services**. This is useful for Tasks that run continuously, such as a web
   service. See the "Services" tab in your Cluster.

Since `training/webapp` is a web app, we will run it as a Service. In the
Services tab, click the blue "Create button":

{% include figure.html path="blog/aws-docker/ecs-services.png" caption="Create an ECS Service" link_to_full_size_image=true %}

Select the Task you created earlier (`hello-world-task:1`), give the Service a
name (e.g., `hello-world-service`), specify that you want 4 tasks (one less
than the number of EC2 Instances in your ECS Cluster, as we'll discuss later),
select the ELB you created earlier (`ecs-load-balancer`), select the service IAM
Role you created earlier (`ecs-service-role`), and click the blue "Create
Service" button:

{% include figure.html path="blog/aws-docker/ecs-service-settings.png" caption="ECS Service Config" link_to_full_size_image=true %}

You should now see that your ECS Service has been created. Initially, the
"desired count" will be at 4 and the "running count" will be at 0:

{% include figure.html path="blog/aws-docker/ecs-service-created.png" caption="Your new ECS Service" link_to_full_size_image=true %}

Click the "Events" tab to see the deployment process:

{% include figure.html path="blog/aws-docker/ecs-service-tasks.png" caption="ECS Service deployment events" link_to_full_size_image=true %}

You may have to refresh a few times, but you should see your ECS Service
starting 4 tasks, then registering 4 EC2 Instances in the ELB, and finally,
reaching a "steady state", which means the deployment has completed. That means
you now have 4 Docker containers running on 4 EC2 Instances and an ELB
distributing load between them. To test it out, click on your ELB (the Events
tab should make the ELB's name, `ecs-load-balancer` a clickable link) to go to
the EC2 Console and copy its DNS Name:

{% include figure.html path="blog/aws-docker/elb-dns.png" caption="ELB DNS" link_to_full_size_image=true %}

If you open this DNS in your browser, you should see the familiar `Hello world!`
text:

{% include figure.html path="blog/aws-docker/elb-hello-world.png" caption="Accessing the app via the ELB" link_to_full_size_image=true %}

### Update Docker containers in your ECS Cluster

Now that you have your Docker containers running in the ECS Cluster, let's go
through an example of how you could update them to a new version. Normally, you
would make some changes to your app, check them in, kick off a build, and
produce a new Docker image with a new tag. However, for this example, the
`training/webapp` Docker image only has the `latest` tag, so we'll update
something else. If you look at the
[source of the training/webapp Docker container](https://github.com/docker-training/webapp/blob/master/webapp/app.py),
you'll see that it uses the value of the environment variable `PROVIDER` as the
second word after "Hello", and only falls back to "world" if `PROVIDER` is not
set. Let's modify our ECS Task to set the `PROVIDER` value to `ECS` for our
Docker container.

Note: ECS Tasks are immutable. You can't change the old definition&mdash;which
is actually a good thing, as it allows you to easily roll back to an older
version if you hit a bug in a newer one&mdash;but you can create a new
*Revision* of the Task. To do that, click the "Task Definitions" link in the
menu on the left, click on your ECS Task (`hello-world-task`), click the
checkbox next to the first Revision of your Task (`hello-world-task:1`), and
click the blue "Create new revision" button:

{% include figure.html path="blog/aws-docker/create-task-revision.png" caption="Create a new Revision of your ECS Task" link_to_full_size_image=true %}

Click on the Container Definition (`hello-world-container`), click the
"Advanced container configuration" link, and scroll down to "Env Variables".
Here, enter `PROVIDER` as the Key and `ECS` as the Value:

{% include figure.html path="blog/aws-docker/container-definition-environment-variable.png" caption="Add an environment variable to the container definition" link_to_full_size_image=true %}

This would also be the time to enter the new tag of your updated Docker image,
but for this tutorial, we're going to stick with `latest`, so just click the
blue "Update" button, then the blue "Create" button, and you should now have
Revision 2 of your Task:

{% include figure.html path="blog/aws-docker/ecs-task-revision-2.png" caption="Revision 2 of the ECS Task" link_to_full_size_image=true %}

Now it's time to deploy the new Revision in the ECS Service. Click the
"Clusters" link in the menu on the left, then click on your ECS Cluster
(`my-ecs-cluster`), then click the checkbox next to your ECS Service
(`hello-world-service`), and click the gray "Update" button:

{% include figure.html path="blog/aws-docker/update-ecs-service.png" caption="Update ECS Service" link_to_full_size_image=true %}

Change the Task Definition from Revision 1 (`hello-world-task:1`) to Revision 2
(`hello-world-task:2`) and click the blue "Update Service" button:

{% include figure.html path="blog/aws-docker/update-ecs-service-revision.png" caption="Update the Task Revision in the ECS Service" link_to_full_size_image=true %}

That's it! Now your new Task is deploying. If you click on the "Events" tab,
you will see the ECS deployment process, which is roughly the following:

1. Look at the Container Definition in the Task to find out what CPU, memory,
   and ports it is requesting.
2. Find an EC2 Instance in the ECS Cluster that has the requested CPU, memory,
   and ports available. Finding the optimal server to run each Task is called
   *Task Scheduling*. In fact, since Docker containers provide isolation, if an
   EC2 Instance is not using all of its CPU or memory, a Scheduler could even
   decide to run multiple Docker containers on the same EC2 Instance, making
   more efficient usage of your resources.
3. If there is no available EC2 Instance that has the requested resources,
   show the error "service hello-world-service was unable to place a task
   because the resources could not be found" and try again in the future.
4. If there is an available EC2 Instance with the requested resources, run the
   new Task Revision on this Instance.
5. When the new Task is up and running, register it in the ELB.
6. Start [draining connections](http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/config-conn-drain.html)
   for an old Revision of the Task.
7. Remove the old Revision of the Task from the ELB.
8. Stop the old Revision of the Task.

Steps #2 above is why you need to have more EC2 Instances in your Cluster
(5) than desired Tasks in the ECS Service (4). That way, there is always at
least one EC2 Instance available to deploy a new Revision of your Tasks. If you
refresh the "Events" tab periodically, you'll see it go through the same cycle
4 times: it will start a new Task on the spare EC2 Instance, register it in the
ELB, deregister an old Task from the ELB, and then stop the old Task. This is
essentially a "rolling deployment", where you are updating one EC2 Instance at
a time. If you have twice as many EC2 Instances as Tasks (e.g., 8 EC2 Instances
and 4 desired Tasks), ECS will be able to do the update much faster, similar to a
[blue-green deployment](http://martinfowler.com/bliki/BlueGreenDeployment.html)
(however, you'll have to pay for twice as many EC2 Instances for this luxury).

After a minute or two, if you go to the URL of your ELB, you should see the new
`Hello ECS!` text:

{% include figure.html path="blog/aws-docker/hello-ecs.png" caption="The new Task Revision is working" link_to_full_size_image=true %}

## Advantages of ECS

It takes *many* steps to set it up, but using an Auto Scaling Group, ELB, and
ECS offers many benefits:

1. Every time you refresh the page, the ELB will send your request to a different
   EC2 Instance, so the load will be evenly distributed across all the servers
   in your Cluster.
2. ECS is monitoring the status of your Docker containers, so if one goes down,
   ECS will automatically deploy a new one.
3. Similarly, the Auto Scaling Group is monitoring the status of your EC2
   Instances, so if one goes down, it will automatically deploy a new one. Once
   the new Instance is up, ECS will automatically deploy Docker containers onto
   it.
4. Since user requests only go to the ELB, most of your down time is hidden
   from users, since the ELB will only route requests to a server
   that is up and running.
5. ECS can do automatic, zero-downtime deployments of new versions of your
   Docker image.

Of course, most importantly, the deployment process is no longer manual. You
just create a new Revision of your ECS Task, update your ECS Service to that
new Revision, and all the deployment details are handled for you automatically.

## Disadvantages of ECS

I have a bunch of minor gripes with ECS&mdash;e.g., it takes a lot of steps to
get started, the documentation is not great unless you already know what to
look for, and it doesn't provide enough visibility into what's going wrong when
you make a mistake&mdash;but the biggest disadvantage of ECS is that it does
not integrate with Auto Scaling. That is, Auto Scaling works just fine to scale
your *EC2 Instances* up or down, but it does not have any direct effect on the
number of desired *ECS Tasks* you run across those Instances. So your Auto
Scaling Group going from 5 to 10 EC2 Instances during peak usage hours will
have no effect if your ECS Service still has desired Tasks set to 4.

There are two possible workarounds for this problem:

1. **Notifications + Lambda**: As described in this
   [post on the AWS Blog](https://aws.amazon.com/blogs/compute/scaling-amazon-ecs-services-automatically-using-amazon-cloudwatch-and-aws-lambda/),
   you can create a notification every time an Auto Scaling Event is about to
   take place and create an [AWS Lambda Job](https://aws.amazon.com/lambda/)
   that listens for those notifications and changes the number of desired Tasks
   accordingly.
2. **Max out desired Tasks**: Set the number of desired Tasks in your ECS
   Service to a number *much* higher than the number of EC2 Instances in your
   Cluster, so if Auto Scaling adds more EC2 Instances, the ECS Scheduler will
   automatically fill that extra capacity with running Tasks.

The problem with both of these workarounds, besides the fact that they require
extra work & maintenance on your behalf, is that, unless you take special care,
they will interfere with the way an ECS Service deploys new revisions of your
Tasks. If the number of desired Tasks is equal to the number of EC2 Instances,
then you won't have any more room to deploy a new version of your Task. In
theory, this shouldn't be a problem, as you should be able to deploy different
versions of the same Task on a single EC2 Instance, but if you are using
ELB&mdash;which can only do a 1:1 port mapping&mdash;this won't work (and the
ECS Scheduler won't even attempt it) because both of those Tasks will be
requesting the same port (see this
[thread on the AWS Forums for more info](https://forums.aws.amazon.com/thread.jspa?messageID=620160)).

If you really want to use Auto Scaling and ECS and avoid hacky workarounds,
there are two other options, although they are quite a bit more involved:

1. **Don't use ELB**. Instead, use a load balancer, such as
   [HAProxy](http://www.haproxy.org/) or [nginx](https://www.nginx.com/), that
   supports URL-based routing (e.g. route `/foo` to port 8080 and `/bar` to
   port 8081). You would need to configure your ECS Tasks to pick a random port
   number (apparently, you can do this by
   [setting the port number to 0 in the Container Definition](https://forums.aws.amazon.com/message.jspa?messageID=665031))
   and have those Tasks register their path(s) and port(s) with the load
   balancer when they boot up. The downside here is you'll have to replicate all
   the features AWS gives you for free with ELB, such as high availability,
   elastic scaling, health checks, and integration with other AWS services
   (e.g. CloudWatch, Auto Scaling, etc).
2. **Don't use the ECS Scheduler**. ECS allows you to swap out its Scheduler
   for your own. You can find instructions in the blog post
   [How to create a custom scheduler for Amazon ECS](https://aws.amazon.com/blogs/compute/how-to-create-a-custom-scheduler-for-amazon-ecs/).
   Some of the alternative Schedulers you could consider include
   [Fleet](https://coreos.com/fleet/docs/latest/launching-containers-fleet.html),
   [Marathon](https://mesosphere.github.io/marathon/),
   [Kubernetes](http://kubernetes.io/), and [Mesos](http://mesos.apache.org/).

## Conclusion

Before I jump into some final thoughts, an important reminder: you should
probably shut down any of the ECS Tasks and EC2 Instances you created during
this tutorial so you don't get charged for them. To do that, first, go to the
[ECS Console](https://console.aws.amazon.com/ecs/home), find your ECS
Service, and update it to set the number of desired Tasks to 0. Once all the
Tasks are stopped, you can delete the ECS Service and Cluster. After that, go
to the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home), and delete
any Auto Scaling Groups, Load Balancers, and terminate any EC2 Instances (in
that order).

With that out of the way, let's talk a little more about Docker deployment. The
first thing to say is that this blog post only touches on one of *many* options.
In addition to the Schedulers mentioned above, some of the other options include
[Docker Swarm](https://docs.docker.com/swarm/), [Deis](http://deis.io/),
[DigitalOcean's Docker supoprt](https://www.digitalocean.com/features/one-click-apps/docker/),
and [Tutum](https://www.tutum.co/). For a good comparison, check out
[Choosing the Right Framework for Running Docker Containers in Production](https://joshpadnick.com/2015/09/01/my-talk-on-choosing-the-right-framework-for-running-docker-containers-in-production/).

My own take is that while Docker is a fantastic tool and the future of
DevOps, it is a relatively young technology and the ecosystem around it is
still immature. Be prepared for bugs, missing features, unnecessary
complexity, and poor documentation. When faced with such an ecosystem (the
[JavaScript MVC ecosystem](http://todomvc.com/) is another one), I
usually try to go with simplest solution that can possibly work. That is,
something that I can understand fully, teach to others, maintain, debug, and
evolve. By these measures, the only Docker deployment tools that meet
my bar are (a) ECS and (b) DIY automation.

ECS, believe it or not, is one of the *simplest* Schedulers out there. Most
of the other alternatives I've tried offer all sorts of fancy bells & whistles,
but they are either significantly more complicated to understand (lots of new
concepts), take too much effort to set up (lots of new technologies to install
and run), are too magical (and therefore impossible to debug), or some
combination of all three. That said, ECS also leaves a lot to be desired.

The good news is that the Docker ecosystem is improving at an incredible rate,
so it'll be interesting to revisit this question in 6-12 months to see how
everything has progressed. I'm especially keeping my eye on
[Tutum](https://www.tutum.co/), as they have been acquired by Docker, and may
become the officially recommended solution.

If you've made it this far, check out my next blog post in this series to learn
how to automate this entire process: [Infrastructure as code: running microservices
on AWS using Docker, Terraform, and
ECS](https://www.ybrikman.com/writing/2016/03/31/infrastructure-as-code-microservices-aws-docker-terraform-ecs/).

