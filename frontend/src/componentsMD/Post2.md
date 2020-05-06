<div id="version_control" class="goHere">

20 mins read.

----
# Let's learn git
## From beginner to advanced

Hello guys, here is Raul. This is the first tutorial on this blog I make
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

<div id="repository_creation" class="goHere">

### First let's create a git repository

Login to your github account  
  
Click on the new green button, repositories new  
  
<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/new_repo.png" />

A repository is the place where your code will stay, more precise where your project
that you will build will stay on the internet.

You should see something like this:  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/new_repo_form.png" />

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

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/repo_created.png" />

</div>

<div id="get_repository_locally" class="goHere">

### Let's go to the terminal

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

If we do not want to clone it we can create a folder then we need to add git remote
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

<div id="git_commit_git_push" class="goHere">  


### How to git commit / git push

Now that we have our repository locally, let's fire up some commands!  

First we have:
```properties
git status
```

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_status.png" />


This command displays paths that have difference between the index file and the
current HEAD commit and paths in the working tree that are not tracked by git. 

You can see there you have information about what branch you are working on, whether
your work is up to date with the branch upstream or if you modified some files.

git status is really important because you can check every git operation with it.  

Next, let's see what this command does:
```properties
git log
```

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_log.png" />


This command shows the  commits log.  
The most important information you can extract from this log is the git commit hash.
You will understand this after we get to git reset and git rebase.
Also there it is the author of the commit so you can see who did an amazing job with
the code he wrote or who broke the things. &#128170;  
Moreover you can see the date of commit and the HEAD locally and the HEAD of the upstream.  

Next in my list is:
```properties
git diff
```

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_diff.png" />

This command shows the difference between the files locally
or files on the upstream.  
Usually I would use this after my work is done and I would check if there is
everything good.

Next image I just want to show you another output for git status  


<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_status_after_modification.png" />

Let me show you how you can add commits

```properties
git add <modified_file>
git commit -m "commit message"
git push origin <branch>
# For example
git add README.md
git commit -m "First commit from terminal!"
git push origin master
```

Let me break that block of code:

```properties
git add <modified_file>
```

This command updates the index using the current content found in the working tree, to prepare the content staged for the next commit.

```properties
git commit -m "commit_message"
```

Create a new commit containing the current contents of the index and the given log message describing the changes.

```properties
git push
```

Updates remote refs using local refs, while sending objects necessary to complete the given refs. 

Also, you can use:

```properties
git fetch # Download objects and refs from repository
git pull # which is equivalent of git fetch + git merge FETCH_HEAD
git checkout # which simply switches branches or restore working tree files
```

In the next image you can see it in action.  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_commit_git_push.png" />

```properties
# For the next image
git log
```

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_log_after_2nd_commit.png" />

I just added the next image to show you how I added the next commit.  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_status_after_2nd_modification.png" />

```properties
# For the next image
git log
```

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_log_after_2nd_modification.png" />

</div>

<div id="git_reset_soft" class="goHere">

### How to git reset soft

Ok, now that we know how git basics work. We can go a little more deeper and learn
about git reset soft.  

The problem sounds like this: You were working really hard on a feature but you made
the following commits:

```text
commit 1 message - "WIP1"
commit 2 message - "WIP2"
commit 3 message - "WIP3"
commit 4 message - "WIP4"
```

Ok, I can't understand what you did and if I look at the code you changed it is
confusing.  

So, what I want to do is to merge all those commits into one and eventually change
the commit message and create a new commit. For this git reset soft come in help.  

You saw at the previous section how my git log looked like:
- Initial commit
- First commit from terminal!
- Second commit from terminal!

And as you could see the Initial commit had a hash. Well go ahead and copy it.  

Now, what I want to do is to type the following:

```properties
# <commit_hash> is the one to which we want to wrap so is the oldest one!
git reset --soft <commit_hash>
```

Because I used --soft all my changes were saved! If I were to use --hard all my
changes would be gone! Of course only locally. Be sure you made the correct changes
before you push especially that you need to use -f or --force because you rewrite
history of the tree.

Now, let's change the last commit message:

```properties
# If I use simple as this, a text editor,
# by default nano will show up
git commit --amend
# If I use --no-edit the same message will
# remain in our case -> Initial commit
git commit --amend --no-edit
# But what I like to do is to pass that -m
# which stands for message
git commit --amend -m "squased every commit"
```

In the next image you can see it in action.  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_reset_soft.png" />

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_log_after_reset_soft.png" />


Here are the modifications from all the commits after git reset soft.
All in one commit!  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/show_changes_remains_after_rest_soft.png" />

</div>


<div id="git_rebase_squash" class="goHere">

### How to git rebase squash

You know how to squash commits with git reset soft but let my show you a more practical example.  

Again, you need to do git log in order to see to what commit you want to go.
Then do the following command:  

```properties
# Here I do not use the commit hash
# I could use it but I wanted to
# show you that I can use HEAD~<number>
git rebase -i HEAD~3
```

Basically I'm going 3 commits behind and -i is for interactive.
A new popup will be displayed. If you haven't set an editor then nano will
show by default. I set mine to be neovim. You simply save and exit.  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_rebase_process.png" />

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/show_origin_and_head.png" />

Here what you want to do is to always have a commit with the command pick.
Then every other ones with squash.  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_rebase_squash.png" />

Here, you change your commit message. What I did, I deleted "fourth",
"fifth", "sixth", and in place of "fourth", because it was the first one I put my new
commit message "I squashed with git rebase!".  

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_rebase_squash_second.png" />

<img class="img-post" src="https://raw.githubusercontent.com/raulgavris/website-portfolio/master/frontend/assets/Post2/git_rebase_after_log.png" />

</div>

<div id="git_rebase_on_top_of_master" class="goHere">

### How to rebase on top of master
We create a new branch, start working on it, and master in the upstream project moves ahead. Our history looks like:

```text
       A---B---C branch1
     /
D---E---F---G origin/master
```

One of our colleagues asks us to “rebase on top of master”, so we fix any merge 
conflicts that may arise between both branches, and keep our changeset together. The 
maintainer would like to see a history like:

```text
               A'--B'--C' branch1
             /
D---E---F---G origin/master
```

git rebase master takes the changes on the current branch (since its divergence from
master) and replays them on top of master, then sets the head of the current branch
to be the head of that new history.
We want to reapply our commits, one by one, in order, onto upstream’s master. Sounds 
like the description of the rebase command! Let’s see what commands would land us 
into the desired scenario:

```properties
git checkout master
git pull origin master
git checkout branch1
git rebase master
git push origin -f branch1
```

</div>

<div id="git_ignore_file" class="goHere">

### Git ignore

.gitingore file is really easy to use. For example let's say we have files like:
- tags (exuberant tags which is used by vim / neovim)
- .vscode-tags (visual studio code)
- node-modules (npm use this to store packages)
- *.pyc (python compiled bytecode)

All these files we can store at the root of the directory we cloned or we added the
remote origin in a file called .gitignore. For example:

.gitingore file containing:
```text
tags
.vscode-tags
node-modules
*.pyc
```

When I do git add . or git add -A to add all the modified files at once, git will
ignore the files added to this file.

</div>

<div id="git_branch_git_checkout" class="goHere">

### How to git branch / git checkout

Ok, but we only worked on master branch, we do not want to push with --force to master
or work 3 programmers on the same branch.

We need to create a new branch!

The following command I use every time I start a new task:

```properties
# This command creates a new branch
# and jumps directly into it.
git checkout -b <branch_name>
# Do the following command so
# you can write simply git push
# or git pull without using
# origin <branch_name> -u is the one
# that sets the upstream
git push origin -u <branch_name>
```

To delete a branch from your local system:

```properties
git branch -D <branch_name>
```

To merge your branch into another branch:

```properties
git checkout <branch_you_want_to_add_changes>
# --no-ff stands for no fast forward and this creates a merge commit
# --ff does not create a merge commit and this is by default
git merge --no-ff <branch_from_what_you_want_to_add_changes>
```

</div>

<div id="git_conflicts" class="goHere">

### Git conflicts

A git conflict may occur when you modify a line in a file in a specific branch and then
you merge this branch to another one where you modified the same line.  
Git will tell you that there is a conficlt and you need to choose from 2 versions of the code:
theirs and ours.


When you do git merge branch1 into branch2 a conflict may happen.  

A git conflict looks something like this:  

```properties
some code here ...  
<<<<<<< HEAD
Branch you want to merge to code ...
=======
Branch from what you want to merge code ...
>>>>>>> branch from what you want to merge
```

In order to fix this you need to delete all the <<<<<<< ======= or >>>>>>> signs.
And choose the version of code you want, the other one simply delete.

Now just do this commands: 

```properties
git add <file>
git commit
```

That's it your conflict has been solved!  

</div>

<div id="conclusion" class="goHere">

### What conclusion can you draw based on this post?

Well, you can now answer these questions at your workplace! &#129304;

“Please rebase on top of master and we’ll merge your pull request”.

“Can you please squash your commits together so we get a clean, reversible git history?”.

“Can you rewrite your commit’s message to describe better the problem it solves, and how it solves it?”.

#### Hope this was useful for you and who knows maybe you learned something new!

</div>
