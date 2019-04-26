#!/bin/bash

set -e # exit with nonzero exit code if anything fails

if [[ $TRAVIS_BRANCH == "master" && $TRAVIS_PULL_REQUEST == "false" ]]; then

echo "Starting to update gh-pages\n"

#copy data we're interested in to other place
cp -R dist $HOME/dist
cp -R docs $HOME/docs

#go to home and setup git
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

#using token clone gh-pages branch
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/${GH_USER}/${GH_REPO}.git gh-pages > /dev/null

#go into directory and copy data we're interested in to that directory
cd gh-pages
cp -Rf $HOME/dist/* .
ls $HOME
cp -Rf $HOME/docs ./docs

echo "Allow files with underscore https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/" > .nojekyll
echo "[View live](https://${GH_USER}.github.io/${GH_REPO}/)" > README.md

#add, commit and push files
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push -fq origin gh-pages > /dev/null

echo "Done updating gh-pages\n"

elif [[ $TRAVIS_BRANCH != "gh-pages" && $TRAVIS_PULL_REQUEST == "false" ]]; then

echo "Starting to update gh-pages from feature branch\n"
pwd

 #copy data we're interested in to other place
 cp -R dist $HOME/dist


 #go to home and setup git
 cd $HOME
 git config --global user.email "travis@travis-ci.org"
 git config --global user.name "Travis"

echo "setup git\n"
pwd

 #create a folder named after the branch
 git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/${GH_USER}/${GH_REPO}.git gh-pages > /dev/null
 pwd
 echo "going to check ls \n"
 ls
 echo "\n"

#go into directory and copy data we're interested in to that directory
cd gh-pages
echo "see that we are in the gh-pages branch\n\n"
git branch -v
echo "\n\ncreating a directory\n\n"
mkdir -p $TRAVIS_BRANCH
pwd
 cd $TRAVIS_BRANCH
 cp -Rf $HOME/dist/* .

echo "printing the current working dir"
pwd

 echo "Allow files with underscore https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/" > .nojekyll
 echo "[View live](https://${GH_USER}.github.io/${GH_REPO}/)" > README.md

 #add, commit and push files
 git add -f .
 git status
 git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
 git branch -v
 git push -fq origin gh-pages > /dev/null

 echo "Done updating gh-pages with build triggered from feature branch ${TRAVIS_BRANCH}\n"

else
 echo "Skipped updating gh-pages, because build is not triggered from the master or feature branch."
fi;
