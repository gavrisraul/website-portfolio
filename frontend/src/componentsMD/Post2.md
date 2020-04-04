<div id="Version_control" class="goHere">

15 mins read.

----
# Let's learn git
## From beginner to advanced

Hello guys, here is Raul. This is the first tutorial I make
so please be patient with me.  

I decided to make a git tutorial and explain the flows I work with everyday in my
life as a software developer.  

First of all, the question we should ask ourselves is: "what is version control?".  
Well...version control systems are a category of software tools that help a team of
programmers manage source code over time. Basically VCS(version control system) keeps
track of every modification to the code in a kind of a database and enable them to collaborate. Using it, the developers can work together on code and separate their tasks through branches.

Ok, I have talked enough about the theory, let's put it into practice.  

I chose to use [github](https://github.com/) which in fact is the platform I work on.  

</div>

<div id="Repository_creation" class="goHere">

### First let's create a git repository
Login to your github account  
  
Click on the new green button, repositories new  
  
<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/src/componentsMD/new_repo.png"/>

A repository is the place where your code will stay, more precise where your project
that you will build will stay on the internet.

You should see something like this:  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/src/componentsMD/new_repo_form.png"/>

You enter your repository name, your description for repository, make it public or 
private. I chose to do mine private so nobody could actually see it and if anyone
would like to contribute to the code I put here, I would need to invite them to
collaborate on this project. I initialized it with a README file which is the file
that will appear at the bottom of the screen.
README file is written in markdown so you can make it more beautiful let's say.
You can make a documentation about your project in this file so every new programmer
that will start working on the project could easily read through this and get started
fast. Of course you can add a license for your project, I chose MIT License. You
should read about these licenses because they are really important. And lastly the
.gitingore file. I chose for this to not include it at the repository creation because
I like to create it manually and add the files that I want git to ignore. You will
understand more about this lately in this post.

Ok, let's click on that Create Repository button.  

Here is my new repository, it should look something like this for you too.  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/src/componentsMD/repo_created.png"/>  

</div>

<div id="Get_repository_locally" class="goHere">

Now, let's see how we can put our repository local in our PC.  

First go to your terminal and choose the directory you would like to go every
time you want to work on this repository. For example let's put it in the Documents
directory.  

```properties
cd ~/Documents
```

Before I can get my code locally I need to run 3 commands.  
```properties
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global github.user "GITHUB_USERNAME"
git config --global user.email "EMAIL@example.com"
# For example:
git config --global user.name "Raul Gavriș"
git config --global github.user "raulgavris"
git config --global user.email "rg.raulgavris@gmail.com"
```

Here I set my git information about who is commiting, what email address is using,
and from what username it is commiting.

Let's get the repo locally. For this I use 2 methods:  

First I would simply

```properties
git clone <url_for_repository>
# For example:
git clone https://github.com/raulgavris/Cool_Repo
```

What this does in this case, is making a http request to the git server to clone
the repo to my pc. I can clone my repo through ssh which is a lot more secure but I
will leave that to another post. One difference between http and ssh is that on http
you must provide username and password every time. For example you push something to
the server. With ssh you genereate a public key which you will add to the repo
and then you don't need to enter username and password. The url for the
ssh will look different something like this:

```properties
git clone git@github.com:raulgavris/Cool_Repo.git
```

Now we can simply change directory and we will work on the code locally:

```properties
cd Cool_Repo
```  

If we do not want to clone it we can create a folder then need to add git remote
origin to that folder, then we simply pull the data from the server.

```properties
mkdir Cool_Repo
cd Cool_Repo
git init
git remote add origin https://github.com/raulgavris/Cool_Repo
git pull origin master
```

We made a folder, went into the folder and initialized it as a git repository.
Then we added the remote server to it and lastly we got all the data from
the server.

</div>

<div id="Git_commit_Git_push" >



</div>

<div id="Git_reset_soft" class="goHere">


</div>


<div id="Git_rebase_squash" class="goHere">


</div>


<div id="Git_rebase_on_top_of_master" class="goHere">

### Rebase on top of master
We fork an open source library, start working on a feature branch, and master in the upstream project moves ahead. Our history looks like:

```text
       A---B---C branch1
     /
D---E---F---G origin/master
```

The library maintainer asks as to “rebase on top of master”, so we fix any merge conflicts that may arise between both branches, and keep our changeset together. The maintainer would like to see a history like:

```text
               A'--B'--C' branch1
             /
D---E---F---G origin/master
```

git rebase master takes the changes on the current branch (since its divergence from master) and replays them on top of master, then sets the head of the current branch
to be the head of that new history.
We want to reapply our commits, one by one, in order, onto upstream’s master. Sounds like the description of the rebase command! Let’s see what commands would land us into the desired scenario:

```properties
git checkout master
git pull origin master
git checkout branch1
git rebase master
git push origin -f branch1
```


“Please rebase on top of master and we’ll merge your pull request”.

“Can you please squash your commits together so we get a clean, reversible git history?”.

“Can you rewrite your commit’s message to describe better the problem it solves, and how it solves it?”.

</div>

