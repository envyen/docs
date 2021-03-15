---
title: IPC in Linux - an Intro
tags:
- IPC
- linux
---

*[Article](http://developeriq.in/articles/2012/may/30/interprocess-communicationipc-programs-in-c-in-ubu/) mirrored from  DeveloperIQ.in / Posted On May 30, 2012 by Shruthi S*

In this article author began to see how multiple processes may be running on a machine and maybe be controlled (spawned by fork()) by one of our programs. In numerous applications there is clearly a  need for these processes to communicate with each exchanging data or control information. There are a few methods which can accomplish this task.

Let us begin with a simple explanation for the term IPC

An application can contain one or more processes (programs). A process can have a child process by forking. The child process can do its own work by its own exec method.

This is not to be confused with threads

Threads are streams of execution within a process. Threads are not available in the standard C library. We have to add a special library in command line. Though, we can have threads in Unix programs, I am concentrating only on processes, child processes and interaction between processes. Simple fork() and exec() are used for simplest communication. They neither provide any mechanism for communicating with the child process while it was running, nor allow to communicate with the process outside the parent-child relationship.

Because of these reasons interprocess communication(IPC) was introduced. It provides a way to communicate between parent and children, between unrelated process and even between process on different machines.

Interprocess communication(IPC) is the transfer of data among different processes.

In this article let us discuss five types of IPC

1. Pipes
2. FIFO-also known as Named pipes
3. Shared Memory
4. Message Queue
5. Semaphore

(Note: For all the IPCs the header file `<sys/ipc.h>` should be added)
## Pipes
Pipes are used for **unidirectional** communication of **related process** only. The main thing you have to note here is the limitation of the data to be passed.

Yes, the **capacity of data** to be sent through pipes are **limited**. As like standard communication the output of one pipe can be given as an input of another pipe. It is not necessary to free them after the process has been finished.

Then, question arises here. Do we need to create pipes for **child process** separetly? The answer is, the child process will **automatically inherits** it. The process of sending and receiving the data are done in a **linear fashion**. The pipes can be either blocked or unblocked.
## FIFO
a.k.a Named Pipes

You may now have a question, what should I do if I am in need to communicate with **unrelated process** ? The solution to this problem is given by means of named pipes. The communication can be done between unrelated processes. Moreover, it can be **bi-directional** as well. 

One more difference between pipes and named pipes is that the capacity of data i.e. the amount of data flowthrough a pipe during execution.
## Shared Memory
As the name implies, the same area of the **physical memory is shared by one or more processes**. This memory segment is mapped into virtual memory spaces.

In shared memory two or more process can access the same memory segment. Let us consider a scenario, there are three process p1, p2 and p3. Processes p1 and p2 are accessing the segment in read mode, and p3 in write mode. If p3 makes any changes to the data, then it is automatically updated for the process p1 and p2 also.

Then who would synchronize the processes? Kernel does not take the job of synchronizing, **user himself have to synchronize** them. The better solution is to use **semaphore** because it is the efficient way to manage the accessing of resources, here we can mean the process as resource i.e. which process has to get the segment.

The disadvantage of shared memory is it does not benefit from the protection that the operating system normal provides. 

Then what is the advantage of using shared memory? Yes, Of course it has its own advantage, which differentiates it from other forms of IPCs. It is that, Shared memory provides fastest mechanism of communication than the others. The process can read or write without using any system call.
## Message Queue
The message queue also provides the way for unrelated processes to communicate with each other.

Comparing with other IPC mechanisms this provides the easiest way of communication than others. Instead of sending data one by one, it sends block of data. This is the difference between the pipes and message queue. The difference between message queue and named pipes is that the messages in the queue can be prioritized which cannot be done in the later.

As message queues are attached with the kernel, whenever a message is sent or received it has to visit the kernel, which makes the communication slow. Because of this, the communication process is little bit slower than the shared memory

As it is a queue, what about the capacity of data? Exactly, we have to concentrate this point too. The capacity of message queue is limited as in pipes. Next to this, does user have to know the current process working in the program? But unfortunately message queue fails to know which is the current process.

Then you may ask what is the real advantage of making use of message queue. It avoids the problem of blocking and synchronization in named pipes by sending messages.
## Semaphore
In a multi-user or multiprocessing systems, there is a problem to have an exclusive access over the shared resource. But it is difficult to write code to ensure the exclusive access to a particular resource.

Then what about setting flags? We can create the files using the O_EXCL flag, which allows the new process to obtain the token. It also had problem. It suits only simple problems. You may ask why we can’t create a token, which guarantees the access to only one process.

Dutch scientist, **Dijkstra** introduced the concept of the semaphore as the solution for the problem. Semaphore is a counter variable, which provides the exclusive access to the shared resource for multipleprocesses.

To get the shared resource, the process has to do the following:

1. First you have to test the semphore value, which controls the shared resource.
2. If the value is positive, the process can make use of the resource. In this, the semaphore value is decremented by 1 to indicate that one unit of the resources is used.
3. If the value is 0,the process goes to sleep. It wakes up only if the semaphore value becomes greater than 0. The semaphore value will be incremented when the process using the resources releases it.

So far I gave a brief introduction about the IPC mechanisms. Now let us have the detailed explanation of how to implement the IPC, ie. The functions and its usage of each mechanism are discussed in detail [here](http://envyen.com/docs/posts/2012-05-30-ipc-in-linux-in-detail/)
