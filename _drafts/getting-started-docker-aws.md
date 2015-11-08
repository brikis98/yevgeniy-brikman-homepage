---
layout: post
title: "Running Docker on AWS from the ground up"
tags:
- DevOps
- Software Engineering
thumbnail_path: blog/aws-docker/aws-logo.png
---

Docker is an awesome tool. In a [previous post](http://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/),
I showed how you can use it to package your code so that it runs exactly the
same way in development and in production. But how, exactly, do you run Docker
in production? Most of the articles I found online assume you're already an
expert in both Docker deployment and cloud providers. They don't take the time
to explain their ideas from first principles and instead dive straight into
jargon like clusters, auto scaling groups, scheduling, nodes, orchestration,
PaaS, IaaS, and so on.

In this post, I'm going to introduce Docker deployment from the ground up, using
[Amazon Web Services](https://aws.amazon.com/) (AWS) for hosting. I picked AWS
because it's incredibly popular, offers a [free tier](https://aws.amazon.com/free/)
you can use to try this tutorial at no cost, and provides first-class Docker
support via the [EC2 Container Service](https://aws.amazon.com/ecs/) (ECS). It
took me longer than I want to admit to get Docker working on AWS, in no small
part because the AWS docs use a lot of jargon (although
[Amazon Web Services in Plain English](https://www.expeditedssl.com/aws-in-plain-english)
does help), so my goal is to make this tutorial accessible to newbies at AWS
deployment and/or Docker deployment (note: if you're a newbie to Docker
development, you should first read
[A productive development environment with Docker on OS X](http://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/)).
I'll start the tutorial by showing the most basic and simple way of running a
Docker container on a single server in AWS, then talk about how to manage
multiple servers and containers using ECS, and finally, discuss the advantages
and disadvantages of ECS, as well as possible alternatives.

## Deploying Docker containers manually

Let's start by manually starting a server in AWS, manually installing Docker on
it, and manually running a Docker image on it. For this tutorial, the Docker
image I'm going to use is [training/webapp](https://hub.docker.com/r/training/webapp/),
which you can use to fire up a simple web server that listens on port 5000 and
responds with "Hello, World":

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

{% include figure.html path="blog/aws-docker/ec2-dashboard.png" caption="EC2 Dashboard" url="https://console.aws.amazon.com/ec2/v2/home" %}

On the next page, you need to pick an *Amazon Machine Image* (AMI) to run on
your EC2 Instance. The AMI contains the software configuration (operating system,
application server, and applications) that will be launched on your server. AWS
offers many free and paid options, such as AMIs with Ubuntu, Windows, or MySQL
pre-installed. For this tutorial, just pick the top option, which is the Amazon
Linux AMI:

{% include figure.html path="blog/aws-docker/linux-ami.png" caption="Pick an AMI" %}

Next, you need to pick the *Instance Type*, which determines what kind of CPU,
memory, storage, and network capacity your server will have. Stick with the
default option, `t2.micro`, and click the gray "Next: Configure Instance Details"
button:

{% include figure.html path="blog/aws-docker/instance-type.png" caption="Pick an Instance Type" %}

YOu can keep the default options for Instance Details, Storage, and Tags, so
keep clicking the gray "Next" button until you get to the "Configure Security
Group" page. A *Security Group* is a set of firewall rules that control the
traffic for your instance. By default, all incoming ports are blocked, so use
this page to add rules that allow incoming SSH (TCP, port 22) and HTTP (TCP,
port 80) requests from any source (`0.0.0.0/0`). Give the Security Group a name
such as "ssh-and-http-from-anywhere", and click the blue "Review and Launch"
button:

{% include figure.html path="blog/aws-docker/security-group.png" caption="Configure security group" %}

On the "Review Instance Launch" page, click the blue "Launch" button. This will
pop up a modal that asks you to pick a *Key Pair*. A key pair consists of a
public key and a private key file that you can use to connect to your EC2
Instance over SSH. Select "create a new key pair" from the drop-down, give the
Key Pair a name like "my-ec2-key-pair", and click "Download Key Pair":

{% include figure.html path="blog/aws-docker/create-key-pair.png" caption="Create and download a Key Pair" %}

Save the Key Pair `.pem` file to a safe and accessible location on your
computer. Now, click the blue "Launch Instances" button in the bottom right of
the modal. This takes you to a "Launch Status" page. Click the blue
"View Instances" button in the bottom right of this page, and you'll be taken to
the EC2 Instances page:

{% include figure.html path="blog/aws-docker/ec2-instances.png" caption="EC2 Instances" %}

This page shows all the EC2 Instances you have running. Click on your newly
created EC2 Instance to see more information about it in the section at the
bottom of the page, such as its state (running, pending, or terminated), launch
time, and public IP address. To SSH to this box, copy its public IP address
and open a terminal. In the terminal, `cd` over to the folder where you stored
the Key Pair, and run the following commands:

{% highlight text %}
> cd ~/my-aws-key-pairs
> chmod 400 my-ec2-key-pair.pem
> ssh -i my-ec2-key-pair.pem ec2-user@<YOUR-EC2-INSTANCE-PUBLIC-IP-ADDRESS>
{% endhighlight %}

If you did everything correctly, you should see something like this:

{% highlight text %}
The authenticity of host 'xx.xx.xx.xx' can't be established.
RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'xx.xx.xx.xx' (RSA) to the list of known hosts.

       __|  __|_  )
       _|  (     /   Amazon Linux AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-ami/2015.09-release-notes/
[ec2-user]$
{% endhighlight %}

Congrats, you now have a fully working Linux server running in the AWS cloud.
Let's install Docker on it.

### Installing Docker

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

> ssh -i my-ec2-key-pair.pem ec2-user@<YOUR-EC2-INSTANCE-PUBLIC-IP-ADDRESS>

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

{% include figure.html path="blog/aws-docker/browser-test.png" caption="Testing the EC2 Instance from the browser" %}

If you see the "Hello world!" text, then the good news is that you are
successfully running a Docker container in the AWS cloud. The bad news is that,
launching Docker containers using this manual process has a number of drawbacks:

1. **Automation**. If you have a large number of servers and a large number of
   Docker containers, you would not want to go through these manual steps for
   each one. Therefore, you need a way to automate this process.
2. **Integration**. Running a Docker container is only one piece of the puzzle.
   You also need to integrate it with all the other parts of your
   infrastructure, such as routing traffic to your containers (load balancing)
   and ensuring the your containers continue running (monitoring, alerting,
   crash recovery).

One way to solve both of these problems is to use Amazon's
[EC2 Container Service](https://aws.amazon.com/ecs/) (ECS).

## Deploying Docker containers on ECS

ECS makes it easier to manage multiple Docker containers running on multiple
EC2 Instances&mdash;*if* you can figure out all the steps required to use it.
To learn all these steps, let's walk through an example. The first step is to
open up your [AWS Console](https://console.aws.amazon.com/console/home) and
click on the EC2 Container Service link to go to the
[ECS Console](https://console.aws.amazon.com/ecs/home). If this is your first
time using ECS, you will be taken to a getting started page. Click the blue
"Get started" button:

{% include figure.html path="blog/aws-docker/ecs-welcome.png" caption="ECS Get Started" %}

This takes you to a wizard that walks you through the process of using ECS, but
I found the wizard confusing, and as you'll never be able to use it again after
this first time, it also doesn't teach you how to use the actual ECS UI.
Therefore, I recommend clicking the cancel button in the bottom right corner:

{% include figure.html path="blog/aws-docker/ecs-tutorial.png" caption="Click cancel to get out of the ECS wizard" %}

This takes you to the Clusters page in the normal ECS UI. A *Cluster* is a
group of EC2 Instances that ECS will manage for you and use for running Docker
containers. To create a Cluster, click the blue "Create Cluster" button:

{% include figure.html path="blog/aws-docker/create-cluster.png" caption="Create ECS Cluster" %}

Give the cluster a name, such as "my-ecs-cluster", click the blue "Create"
button, and your new Cluster will show up on the Clusters page:

{% include figure.html path="blog/aws-docker/ecs-clusters.png" caption="Your new ECS Cluster" %}

Notice how your Cluster shows zero "Registered Container Instances". You need to
create some new EC2 Instances and configure them so they register themselves in
your ECS Cluster. Moreover, if you are running web services across multiple EC2
Instances, then you will also want to create an *Elastic Load Balancer* (ELB)
to distribute traffic between them and to have those EC2 Instances register
themselves in the ELB when they boot up. To register in an ECS Cluster and in
an ELB you need to:

1. Configure each EC2 Instance so it know what ECS Cluster to talk to by
   specifying the Cluster name in the `/etc/ecs/ecs.config` file on the EC2
   Instance.
2. Run the [Amazon ECS Container Agent software](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_agent.html)
   on each EC2 Instance. This Agent will take care of registering the EC2
   Instance with ECS. The easiest way to run the ECS Container Agent is to use
   an AMI that has the Agent pre-installed.
3. Create one [IAM Role](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/IAM_policies.html)
   that grants the necessary Permissions to talk to an ECS Cluster and another
   IAM Role that grants the necessary Permissions to talk to an ELB.
4. Create the ELB.

We will go through this list backwards, starting with task #4 and working our
way up.

### Create the ELB

To create an ELB, open the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home)
(mouse over the "Services" menu at the top and click "EC2"), click the "Load
Balancers" link in the bottom left, and click the blue "Create Load Balancer"
button:

{% include figure.html path="blog/aws-docker/create-load-balancer.png" caption="Create a Load Balancer" %}

Give the ELB a name such as "ecs-load-balancer" and notice the "Listener
Configuration" settings. This ELB will route all HTTP traffic that it gets on
port 80 to port 80 of any EC2 Instances you attach to it. This will work for
our example, so leave those settings as-is and click the gray "Next: Assign
Security Groups" button:

{% include figure.html path="blog/aws-docker/load-balancer-basic-config.png" caption="Give the Load Balancer a name" %}

On the next page, click the "Select an existing security group" radio button,
click the checkbox next to the Security Group you created earlier
("ssh-and-http-from-anywhere") and uncheck any other Security Groups, and click
the gray "Next: Configure Security Settings" button:

{% include figure.html path="blog/aws-docker/load-balancer-security-settings.png" caption="Select the Security Group you created earlier" %}

Ignore the warning (we aren't using SSL in this example) and click the gray
"Next: Configure Health Check" button. The ELB uses a *Health Check* to
periodically check if the EC2 Instances its routing to are actually up and
running. It does this by sending a *Ping* (usually, an HTTP request) to a
configurable URL on each EC2 Instance at a configurable interval. If the EC2
Instance responds with a 200 OK within a configurable period of time, it is
considered healthy; if it doesn't, it is taken out of the ELB's rotation until
future Pings mark it as healthy. For this tutorial, set the *Ping Path* to `/`
(the only URL our Docker container knows how to handle) and click the gray
"Add EC2 Instances" button:

{% include figure.html path="blog/aws-docker/load-balancer-health-check.png" caption="Set the Health Check Ping Path to /" %}

On the next page, you can manually add EC2 Instances to the ELB, but we're going
to add Instances a different way, so skip this for now by clicking the gray
"Next: Add Tags" button, and then the blue "Review and Create" button, and
finally, the blue "Create" button. Once the ELB is created, click the blue
"Close" button the confirmation page and you should see your new ELB in the
list, which takes care of task #4:

{% include figure.html path="blog/aws-docker/load-balancer-new.png" caption="Your newly created ELB" %}

### Create IAM Roles

Let's move on to task #3, creating IAM Roles. *IAM* stands for Identity and
Access Management. IAM is the mechanism AWS uses to a) identify *Resources*,
such as a User or Service, and b) define *Permissions* and *Policies* that
specify what that Resource is or isn't allowed to do. For example, by default,
no Resources have the necessary Permissions to talk to an ECS Cluster. In order
to allow your EC2 Instances to talk to your ECS Cluster, you can define an *IAM
Role*, which is a set of Permissions that can be attached to your EC2 Instance.
Head over to the [IAM Console](https://console.aws.amazon.com/iam/home) (you
can mouse over the "Services" menu and click the "IAM" link), click the "Roles"
link on the left side, and click the blue "Create New Role" button:

{% include figure.html path="blog/aws-docker/iam-roles.png" caption="Create an IAM Role" %}

Give the role a name, such as "ecs-instance-role", and click the blue "Next
Step" button in the bottom right. From the "AWS Service Roles" list, click
the gray "Select" button next to "Amazon EC2":

{% include figure.html path="blog/aws-docker/iam-role-type.png" caption="Select the Amazon EC2 Service Role" %}

On the next page, search for "AmazonEC2ContainerServiceforEC2Role", click
the checkbox next to "AmazonEC2ContainerServiceforEC2Role", and click the blue
"Next Step button":

{% include figure.html path="blog/aws-docker/ecs-container-role.png" caption="Check AmazonEC2ContainerServiceforEC2Role" %}

Click the blue "Create Role" button and you should see your new IAM Role in the
list:

{% include figure.html path="blog/aws-docker/new-ecs-role.png" caption="The new IAM Role" %}

Similarly, we need to create another IAM Role that grants Permissions to talk
to the ELB. Click the blue "Create New Role" button again, give the role a name
such as "ecs-service-role", and click the blue "Next Step" button in the
bototm right. From the "AWS Service Roles" list, click the gray "Select" button
next to "Amazon EC2 Container Service Role":

{% include figure.html path="blog/aws-docker/ecs-service-role.png" caption="Select the Amazon EC2 Container Service Role" %}

Click the checkbox next to the "AmazonEC2ContainerServiceRole" (the only one in
the list), click the blue "Next Step" button in the bottom right, and then
click the blue "Create Role" button. You should now have two IAM roles:

{% include figure.html path="blog/aws-docker/two-iam-roles.png" caption="The EC2 Instance Role and the ECS Service Role" %}

### Creating an Auto Scaling Group for an ECS Cluster

Now you can move onto task #2: creating an EC2 Instance that runs the ECS
Container Agent. Instead of creating one EC2 Instance at a time, you can
create an *Auto Scaling Group* which will automatically launch multiple EC2
Instances for you based on rules you define. For example, you could define
rules to keep 5 EC2 Instances running at all times, or you could define rules
that increase or decrease the number of EC2 Instances based on metrics (such
as latency, QPS, etc) measured by Amazon's monitoring service,
[CloudWatch](https://aws.amazon.com/cloudwatch/).

To create an Auto Scaling Group, open the [EC2 Console](https://console.aws.amazon.com/ec2/v2/home)
(mouse over the "Services" menu at the top and click "EC2"), click the "Auto
Scaling Groups" link in the bottom left, and click the blue "Create Auto Scaling
Group" button:

{% include figure.html path="blog/aws-docker/create-auto-scaling-group.png" caption="Create an Auto Scaling Group" %}

The next step is to define a *Launch Configuration*. This is a reusable
template that defines what kind of EC2 Instances the Auto Scaling Group should
launch, including the AMI, instance type, security group, and all the other
details you saw when launching an EC2 Instance manually in the first part of
this tutorial. Click the blue "Create launch configuration" button in the
bottom-right corner to go to the AMI selection page. Instead of using the
Amazon Linux AMI as before, click the "AWS Marketplace" tab on the left, search
for "ECS", and select the "Amazon ECS-Optimized Amazon Linux AMI" (don't worry,
it's part of the AWS free tier):

{% include figure.html path="blog/aws-docker/ecs-ami.png" caption="Use the Amazon ECS-Optimized Amazon Linux AMI" %}

This Amazon ECS-Optimized Amazon Linux AMI already includes the ECS Container
Agent, so that takes care of task #2. On the next page, select `t2.micro` as
the instance type, and click the gray "Next: Configure details" button. Give
the Launch Configuration a name, such as "ecs-launch-configuration", select
the IAM Role you just created from the drop-down list ("ecs-instance-role"),
and then click the "Advancded Details" link to open up the bottom section. Find
the text box labeled "User data" and enter the following shell script into it:

{% highlight bash %}
#!/bin/bash

echo ECS_CLUSTER=my-ecs-cluster > /etc/ecs/ecs.config
{% endhighlight %}

*User data* is a place you can put custom shell scripts that the EC2 Instance
will run right after booting. The shell script above puts the name of your
ECS Cluster ("my-ecs-cluster", in this example) into the `/etc/ecs/ecs.config`
file. The ECS Container Agent will look into this file to find the name of your
ECS Cluster (if you don't specify a name, it will use "Default"). This takes
care of task #1. Your Launch Configuration should look something like this:

{% include figure.html path="blog/aws-docker/launch-config-details.png" caption="Name the launch configuration and use your newly created IAM Role" %}

Click the gray "Next: Add Storage" button, leave all the default Storage
configuration options, and click the gray "Next: Configure Security Group
button". On the next page, click the "Select an existing security
group" radio button, click the checkbox next to the Security Group you
created earlier ("ssh-and-http-from-anywhere"), and click the blue "Review"
button:

{% include figure.html path="blog/aws-docker/launch-config-security-group.png" caption="Use the Security Group you created earlier" %}

Now click the blue "Create launch configuration button" and a modal will pop up
asking you to select a Key Pair. Select "Choose an existing key pair" from the
first drop-down box, select the Key Pair you created earlier
("test-ec2-key-pair") from the second drop-down, click the "I acknowledge that
I have access to the selected private key file..." checkbox, and click the blue
"Create launch configuration" button:

{% include figure.html path="blog/aws-docker/launch-config-key-pair.png" caption="Use the Key Pair you created earlier" %}

You should now be in a screen prompting you to create an Auto Scaling Group.
Give the Auto Scaling Group a name, such as "ecs-auto-scaling-group" and specify
a Group size of 5, which will tell the Auto Scaling Group to initially
launch 5 EC2 Instances.

Next, you need to pick what Subnet(s) to use. A *Subnet* is a range of IP
addresses used to segregate AWS Resources (such as your EC2 Instances) from
each other or from the public Internet. For example, you might define a
*Public Subnet*, with rules that make it accessible from the public Internet,
and put your front-end App Servers in it (so that your users can access them
directly). You could also define a *Private Subnet*, with rules that make it
not accessible from the public Internet (so that your users can't access them
directly), but do make it accessible to the Subnet with your App Servers (so
your front-end apps can read to and write from the database).

Subnets are a large topic of their own, so I won't cover them here, but you may
want to read the [AWS VPC](https://aws.amazon.com/vpc/) documentation for more
info. For now, pick any Subnet you want from the drop-down list, and the Auto
Scaling Group will deploy your EC2 Instances across them. In the "Advanced
Details" section, click the "Receive traffic from Elastic Load Balancer(s)"
check box, and select the ELB you created earlier ("ecs-load-balancer"). The
page should look something like this:

{% include figure.html path="blog/aws-docker/auto-scaling-basic-config.png" caption="Give the Auto Scaling Group a name, a size of 5, a couple Subnets, select the ELB you created earlier" %}

Click the gray "Next: Configure scaling polices" button. On the next page, you
could configure rules for how to change the number of EC2 Instances in the Auto
Scaling Group, but for this tutorial, you can leave the group at its initial
size of 5, so just skip this section and click the blue "Review" button,
followed by the blue "Create Auto Scaling Group" button. Once your Auto Scaling
Group has been created, click the blue "Close" button on the confirmation
screen and you should see your Auto Scaling Group in the list:

{% include figure.html path="blog/aws-docker/new-auto-scaling-group.png" caption="Your newly created Auto Scaling Group" %}

Initially, the Auto Scaling Group will show five "Desired Instances", but zero
actually launched Instances. If you wait a minute and refresh the list, the
number of launched Instances will go to 5. Head back to the
[ECS Console](https://console.aws.amazon.com/ecs/home), and you should now see
five "Registered Container Instances" in your ECS Cluster:

{% include figure.html path="blog/aws-docker/ecs-cluster-registered.png" caption="Your ECS Cluster should now have 5 registered instances" %}

### Running Docker containers in your Cluster

Now that we have a working Cluster, we can finally run some Docker containers
in it. To do that, you first have to create an ECS *Task*, which defines the
Docker image(s) to run, the resources (CPU, memory, ports) you need, what
volumes to mount, etc. Click the "Task Definitions" link on the left and then
the blue "Create new Task Definition" button:

{% include figure.html path="blog/aws-docker/create-task.png" caption="Create a new ECS Task" %}

Give the Task a name, such as "hello-world-task" and click the "Add Container
Definition" link. In the section that slides out, specify the Container name
(e.g., "hello-world-container"), the Docker image to run
("training/webapp:latest"), the amount of memory to allocate (128 is plenty for
this tutorial), the port mapping (map port 80 on the host to port 5000 in the
Docker container), and click the blue "Add" button:

{% include figure.html path="blog/aws-docker/task-definition.png" caption="Task definition" %}

Click the blue "Create" button to create the Task. Now it's time to run the
Task in your Cluster. Click on the "Clusters" link in the menu on the lift and
then click on the name of your Cluster ("my-ecs-cluster"). There are two ways
to run Tasks:

1. **One-off tasks**. This is useful for a Task that runs once to completion and
   exits. See the "Tasks" tab in your Cluster.
2. **Services**. This is useful for Tasks that run continuously, such as a web
   service. See the "Services" tab in your Cluster.

Since `training/webapp` is a web app, we will run it as a Service. In the
Services tab, click the blue "Create button":

{% include figure.html path="blog/aws-docker/ecs-services.png" caption="Create an ECS Service" %}

Select the Task you created earlier ("hello-world-task:1"), give the Service a
name (e.g., "hello-world-service"), specify 4 tasks (one less than the number
of EC2 Instances in your ECS Cluster, as we'll discuss later), select the ELB
you created earlier ("ecs-load-balancer"), select the IAM Role you created
earlier ("ecs-service-role"), and click the blue "Create Service" button:

{% include figure.html path="blog/aws-docker/ecs-service-settings.png" caption="ECS Service Config" %}

You should now see that your ECS Service has been created. Initially, the
"desired count" will be at 4 and the "running count" will be at 0:

{% include figure.html path="blog/aws-docker/ecs-service-created.png" caption="Your new ECS Service" %}

Click the "Events" tab to see the deployment process:

{% include figure.html path="blog/aws-docker/ecs-service-tasks.png" caption="ECS Service deployment events" %}

You may have to refresh a few times, but you should see your ECS Service
starting 4 tasks, then registering 4 EC2 Instances in the ELB, and finally,
reaching a "steady state", which means the deployment has completed. That means
you have 4 Docker containers running on 4 Docker instances and an ELB
distributing load between them. To test it out, click on your ELB (the events
tab should make the ELB's name, "ecs-load-balancer" a clickable link) to go to
the EC2 Console and copy its DNS Name:

{% include figure.html path="blog/aws-docker/elb-dns.png" caption="ELB DNS" %}

If you open this DNS in your browser, you should see the familiar "Hello world!"
text:

{% include figure.html path="blog/aws-docker/elb-hello-world.png" caption="Accessing the app via the ELB" %}

## Advantages of ECS

It takes *many* steps to set it up, but using an Auto Scaling Group, ELB, and
ECS gives a lot of benefits:

1. Every time you refresh the page, the ELB will send your request to a different
   EC2 Instance, so the load will be evenly distributed across all the servers
   in your Cluster.
2. ECS is monitoring the status of your Docker containers, so if one goes down,
   ECS will automatically deploy a new one.
3. Similarly, the Auto Scaling Group is monitoring the status of your EC2
   Instances, so if one goes down, it will automatically deploy a new one. Once
   the new Instance is up, ECS will automatically deploy Docker containers onto
   it.
4. ECS can do automatic, zero-downtime deployments of new versions of your
   Docker image. In fact, let's try it.

If you look at the [source of the training/webapp Docker container](https://github.com/docker-training/webapp/blob/master/webapp/app.py),
you'll see that it uses the value of the environment variable `PROVIDER` as the
second word after "Hello", and only falls back to "world" if `PROVIDER` is not
set. Let's deploy a new version of our ECS Task with the `PROVIDER` value set
to "ECS". Note that ECS Tasks are immutable. You can't change the old
definition&mdash;which is actually a very good thing, as it allows you to easily
roll back to an older revision if you hit a big in a newer one&mdash;but you can
create a new revision of the Task. To do that, click the "Task Definitions"
link in the menu on the left, click on your ECS Task ("hello-world-task"),
click the checkbox next to the first revision of your Task
("hello-world-task:1"), and click the blue "Create new revision" button:

{% include figure.html path="blog/aws-docker/create-task-revision.png" caption="Create a new revision of your ECS Task" %}

Click on the Container Definition ("hello-world-container"), click the
"Advanced container configuration" link, and scroll down to "Env Variables".
Here, enter `PROVIDER` as the Key and `ECS` as the Value:

{% include figure.html path="blog/aws-docker/container-definition-environment-variable.png" caption="Add an environment variable to the container definition" %}

If you had a new version of your Docker container (e.g., something other than
"latest"), you could specify it at this time as well. We're going to stick with
"latest", so just click the blue "Update" button, then the blue "Create" button,
and you should now have revision 2 of your Task:

{% include figure.html path="blog/aws-docker/ecs-task-revision-2.png" caption="Revision 2 of the ECS Task" %}

Now it's time to deploy it in your ECS Service. Click the "Clusters" link in the
menu on the left, then click on your ECS Cluster ("my-ecs-cluster"), then click
the checkbox next to your ECS Service ("hello-world-service"), and click the
gray "Update" button:

{% include figure.html path="blog/aws-docker/update-ecs-service.png" caption="Update ECS Service" %}

Change the Task Definition from revision 1 ("hello-world-task:1") to revision 2
("hello-world-task:2") and click the blue "Update Service" button:

{% include figure.html path="blog/aws-docker/update-ecs-service-revision.png" caption="Update the Task revision in the ECS Service" %}

If you click on the "Events" tab, you will see ECS begin to deploy the new
revision. The ECS deployment process is roughly the following:

1. Look at Container Definition in the Task to find out what CPU, memory, and
   ports it is requesting.
2. Find an EC2 Instance in the ECS Cluster that has the requested CPU, memory,
   and ports available. Finding the optimal server to run each Task is called
   *Task Scheduling*.
3. Run the new Task revision on the selected EC2 Instance.
4. When the new Task is up and running, register it in the ELB.
5. Start [draining connections](http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/config-conn-drain.html)
   for an old revision of the Task.
6. Remove the old Task from the ELB.
7. Stop the old Task.

Step #2 above is why we need to have more EC2 Instances in our Cluster (5) than
desired Tasks in our ECS Service (4): that way, there is at least one EC2
Instance available to deploy a new revision of the Task. If you refresh the
"Events" tab periodically, you'll see it go through the same cycle 4 times: it
will start 1 Task on the spare EC2 Instance, register it in the ELB, deregister
an old Task from the ELB, and then stop the old Task. This is essentially a
"rolling deployment", where you are updating one EC2 Instance at a time. If you
have twice as many EC2 Instances as Tasks (e.g., 8 EC2 Instances in this
example), ECS will be able to do the update much faster, similar to a
[blue-green deployment](http://martinfowler.com/bliki/BlueGreenDeployment.html)
(however, you'll have to pay for twice as many EC2 Instances for this luxury).

After a minute or two, if you go to the URL of your ELB, you should see the new
"Hello ECS!" text:

{% include figure.html path="blog/aws-docker/update-ecs-service-revision.png" caption="Update the Task revision in the ECS Service" %}

## Disadvantages of ECS

<!--

6. ECS limitations
   a. Note, ELB cannot route based on URL patterns. It simply maps one port to
      another port. Therefore, for HTTP services (port 80), you're limited to
      one instance per VM with services. Only solution is to set up your own
      load balancer, such as nginx or HAProxy.
   b. Autoscaling doesn't work so well. Since you're limited to one instance per
      box, you can stop using ECS and switch to simple user data script.
   c. Alternative is to use lambda job
   d. Or, use a custom scheduler, such as Mesos. But these are significantly
      more complicated to set up. Now that Docker has acquired [Tutum](https://www.tutum.co/),
      it'll be interesting to see what they do with it.
      See also https://joshpadnick.com/2015/09/01/my-talk-on-choosing-the-right-framework-for-running-docker-containers-in-production/
   e. ECS provides limited monitoring, log aggregation, route and volume mapping.
   f. How can you integrate this with docker-compose?
6. Running Docker containers is great, because it makes server setup so much
   easier. But we still did a lot of manual steps. To automate all of this, we
   will explore infrastructure as code in a future post.

Don't forget to terminate your instances and auto scaling groups!
-->