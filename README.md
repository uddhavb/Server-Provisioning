# HW1-P2

## Automatically provisioning service providers
The code automatically provisions servers in the aws and digital ocean platforms and prints out the public ip address of the servers created.   

## Configuration management to build this repo  
Used npm to build and manage software dependencies. Hence all the packages needed to run the code will be available on running 'npm install'. Also all the code is in the main.js file and in separate files as well.

## Screencast  
[Automatic server provisioning](https://youtu.be/m34n-JopFPQ)

## Conceptual questions   
####  Define idempotency. Give two examples of an idempotent operation and non-idempotent operation.   
Idempotency can be defined as the ability to carry out the same operation more than once and still be in the same state. This means that a system is able to reach its desired state irrespective of its current state when some operation is carried out.   
- Idempotent operations:
  1. Ansible scripts are supposed to be idempotent. That is if you run an ansible script to install a programme when it does not exist on the client, we get a success result. But we also get success when the programme already exists. Hence it is an idempotent operation.
  2. Building a project gives you the same build, irrespective of whether it was built earlier or not. Even if the same project is built many times we will get the same build provided that no changes are made to the project.
  3. In RESTful services GET, PUT requests are idempotent as running them multiple times simply fetches or updates the data respectively giving the same result everytime.   
- Non Idempotent operations:
  1. Downloading things from the internet using a web browser is non idempotent since clicking download will download the file again and again even if it already exists.
  2. Creating aws ec2 instance with the same name using nodejs script is not idempotent as even if the instance with that name exists, it creates a new one with the same name.  
  3.  In RESTful services POST not idempotent. For instance, repeated POST calls to users may create multiple users may create multiple users which is a different state eveytime. Also DELETE request may return different values when the item was deleted and when it was not found.  
      
#### Describe several issues related to management of your inventory.     
 The issues related to inventory management are:   
 - A centralized inventory may have problems of cost and complexity. In decentralized inventories the atomicity and duplicity of the data may be a challenge.    
 - Training users and employees to handle the inventories can take up company's resources. Also it may need expertize for the best results.   
 - Inventories may be very costly to maintain and manage, thus many small scale companies may find it difficult to have such inventories.   
 - Scalability is an issue with traditional inventories. Today's growing data supplies mean increasing the inventory sizes and hence in conventional systems, it might have many problems like cost, access etc.   
 - Not automating the inventory management can mean that time needed to manage it is very high along with the resources needed. Also there is high chance of errors in non automated processes.   
    
#### Describe two configuration models. What are disadvantages and advantages of each model?   
1. The push model: Here one server has the configuration management software installed on it and it pushes the changes to all the agents. the agents act like slaves and have to align with the commands of the master server.  
Advantages: 
 - This model is easy to manage as we have just one server with the configuration management tools and all other hosts just carry out the commands sent.  
Disadvantages: 
 - The state of the host may not be maintained as there is less enforcement. The host may change as per commands and hence drift away from its configuration even if it is not supposed to.  
 - The assets are managed centrally from a server and this may be a bottleneck as all the hosts are dependent on the server for configuration management.    
    
2. The pull model: Here the agents have their own configuration management tools along with the centralized server. The server pulls the states and configurations from the agents and tells them what to do accordingly.   
Advantages: 
- This method is better at ensuring that assets stay in sync with the configuration as the agents have their own configuration management tools and hence will not need be damaged by arbitrary changes made by a centralized server.  
- Here the asset can register itself to the agent and does not require permission from the server. This means that the agent can check and register the asset without waiting for peemission from the server.   
Disadvantages:   
- However this model is very complex as all the agents have their own configuration management. the server has to do much more work in managing the agents and the task is also very complex.  
   
3. Long Transaction Model: Each change happens in a long-running transaction, starting with a configuration. Subtransactions are started for explorative work. Versions are not visible except when committing transactions. Transactions generate work spaces that are completely isolated.   
Advantages: 
- Long transactions represent workspaces and development paths. Concurrency control schemes like locking etc coordinate concurrent transactions.
Disadvantages:   
- Concurrency control limits change propagation in the repository. Hence changes may remain isolated and not be visible everywhere.  

4. Change set model: A change set is a set of deltas relative to a baseline. A new configuration is selected by specifying a baseline and a change set to be applied.   
Advantages: 
- The changes in the system are always based on initial baseline configuration and hence errors and bugs are easy to spot and fix.  
Disadvantages:   
- Arbitrary combination of changes is not normally possible, because of change interaction.
    
#### What are some of the consquences of not having proper configuration management?   
- The configuration management needs to be well monitored. Any improper changes that may be left unmonitored may cause severe damages to functioning of systems and client services.   
- Unauthorized changes can be catastrophic and lead to losses.   
- Using continuous integration or build automation tools in place of configuration management. These tools are simply not equipped to provide ongoing operations support, visibility and coordination in Production that modern Configuration Management solutions provide.   
- Traditional application deployment solutions are not meant to be infrastructure configuration management products. They can get you part of the way there, but you’ll need to script it all, which is not extensible and defeats the true purpose of a tool, and they simply put your application into the next environment.   
- Server software flaws or misconfigurations may permit directory listing and directory traversal attacks. 
- Unnecessary default, backup, or sample files, including scripts, applications, configuration files, and web pages may lead to taking up of excess resources and time.  
