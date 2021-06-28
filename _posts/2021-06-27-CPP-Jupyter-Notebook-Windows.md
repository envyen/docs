---
title: Jupyter Notebook for CPP in Windows
layout: post
tags:
- jupyter-notebook
- cpp
---

### Setup Jupyter Notebook for C++ on Windows

Jupyter notebook supports C/C++ using the [](xeus-cling) project.

`xeus-cling` is a Jupyter kernel for C++ based on the C++ interpreter cling and the native implementation of the Jupyter protocol xeus.

This has been built mainly for Linux and OS X platforms and doesnt support Windows Jupyter notebook.

The below steps helps to setup the environment on Windows using WSL

#### 1. Enable Ubuntu on WSL

If you have not used WSL before on windows, please follow the steps from Microsoft [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10) 

Install Ubuntu for Windows from Windows Store. I'm using Ubuntu 18.04.

Other supported Linux flavours can be used. I have not yet tried though.

#### 2. Install Miniconda

Install miniconda from https://conda.io/miniconda.html

Please download Linux version for your 32/64 bit system accordingly. 

I downloaded `Miniconda3-latest-Linux-x86_64.sh` for my 64-bit WIndows. 


Install miniconda
```sh
$ ./Miniconda3-latest-Linux-x86_64.sh
```

#### 3. Conda, Jupyter Notebook, Xeus-Cling setups

Init and update conda. Init will add the required bootstrapping in your bashrc

```sh
conda init
conda update conda
```

Create a environment for cpp

```sh
conda create -n cpp
```

Activate the environment

```sh
conda activate cpp
```

Install Jupyter notebook, xeus-cling and required cpp extensions

```sh
conda install notebook
conda install -c conda-forge xeus-cling
conda install -c conda-forge jupyter_contrib_nbextensions
conda install -c conda-forge jupyter_nbextensions_configurator
jupyter nbextensions_configurator enable --user

```

#### 4. Write Notebooks

Now that everything is setup, choose a directory for your notebooks

I choose `~/cpp-books`

```
cd ~/cpp-books
conda activate cpp
```

Run Jupyter notebook with `--no-browser` option as we are in WSL and paths are not valid directly to open a page in windows.

```
jupyter notebook --no-browser
```

#### 5. Open Windows Browser fix 

Generate a editable default config for Jupyter 
```sh
jupyter notebook --generate-config
echo c.NotebookApp.use_redirect_file = False >> ~/.jupyter/jupyter_notebook_config.py

```

Set your desired Windows Browser variable like
```sh
export BROWSER="/mnt/c/Program Files/Mozilla Firefox/firefox.exe" 
```
or
```sh
export BROWSER="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
```

With above config and `BROWSER` env variable set, no need to add `--no-browser` option.
Just run

```sh
jupyter notebook
```

#### 6. Create a Windows Desktop Shortcut

Inside WSL create a script file to set the environment and run Notebook

`$ cat ~/note`

```sh
#!/bin/bash                                                                                                             source /home/<user>/miniconda3/etc/profile.d/conda.sh
cd ~/cpp-books
source /home/<user>/miniconda3/etc/profile.d/conda.sh 
conda activate cpp
export BROWSER="/mnt/c/Program Files/Mozilla Firefox/firefox.exe"                                                       
jupyter notebook
```

Change `<user>`/path accordingly

Now from Windows Desktop
Create a new Shortcut:

![](../../upload/cpp-jupyter/image-1.png "Create new shortcut") 

Set the location to 
```
C:\Windows\System32\wsl.exe bash -c "source /home/<user>/note"
```

![](../../upload/cpp-jupyter/image-2.png "Set location") 

Now you can open the shortcut to view your notebooks on Windows browser

![](../../upload/cpp-jupyter/image-3.png "CPP Jupyter Notebook in browser") 

Additionally, in the shortcut properties change to start minimised.

![](../../upload/cpp-jupyter/image-4.png "Shortcut make Start Minimized") 
