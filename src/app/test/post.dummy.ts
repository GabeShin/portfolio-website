import { Post, PostCategory } from "@/interfaces/posts.interface";

const dummyPosts: Post[] = [
  {
    id: "1",
    counter: 10,
    category: PostCategory.PERSONAL,
    title: "My Personal Journey",
    author: "Gabe",
    date: new Date("2023-09-01T12:34:56"),
    content: `# My Personal Journey
    This is my journey.
    - Started from the bottom
    - Still here`,
  },
  {
    id: "2",
    counter: 25,
    category: PostCategory.WORK,
    title: "Challenges at Work",
    author: "Gabe",
    date: new Date("2023-09-05T08:30:45"),
    content: `# Challenges at Work\n## Issues Faced\n- Deadlines\n- Technical Debt\n- Office Politics
  
    \n## How to Overcome
    \n1. **Plan**
    \n2. *Execute*
    \n3. Review`,
  },
  {
    id: "3",
    counter: 15,
    category: PostCategory.EXPERIENCE,
    title:
      "A Memorable Experience long title exmaple - A Memorable Experience long title exmaple - A Memorable Experience long title exmaple - A Memorable Experience long title exmaple - A Memorable Experience long title exmaple",
    author: "Gabe",
    date: new Date("2023-09-10T14:22:30"),
    content: `# A Memorable Experience
    \nThis was absolutely fantastic.
    \n
    \n > Best day ever!
    \n
    \n\`\`\`javascript
    console.log('A Memorable Experience');
    console.log('A Memorable Experience');
    console.log('A Memorable Experience');
    \n\`\`\`
    \n
    \n![Memorable Day](profile_picture.jpeg)`,
  },
  {
    id: "4",
    counter: 125,
    category: PostCategory.PERSONAL,
    title: "Empty Post",
    author: "Gabe",
    date: new Date("2023-09-15T00:00:00"),
    content: ``,
  },
  {
    id: "5",
    counter: 1111,
    category: PostCategory.WORK,
    title: "Tech Blog Example",
    author: "Gabe",
    date: new Date("2023-09-15T00:00:00"),
    content: `## Introduction
    
    \nEver since our team has started developing our new service, the agility and scalability of the modern software has been our primary concern. We operate in an ecosystem comprising a Kubernetes cluster with multiple services and multiple AWS Lambda functions serving various use cases. However, as the service grows, we faced new challenges that test our adaptability and resolve.
    
    \nIn line with our commitment to continuous integration and continuous deployment (CI/CD), our team follows a bi-weekly release schedule. This routine ensures that we can deliver features, updates, and bug fixes with remarkable speed and efficiency. However, as we have grown and added more services to our product, this schedule has started to show its limitations.
    
    \nThe principle of microservices encourages the division of services into standalone components, each with its own repository and CI/CD pipeline. This approach facilitated focused development, easier testing, and quicker deployments. Our team embraced this principle, leading us to manage a multitude of repositories, each corresponding to a unique service within our stack.
    
    \nBut as the saying goes, "Too many cooks spoil the broth." We've begun to realize that while our numerous repositories are a testament to our robust microservices architecture, they have also introduced a complexity of their own: synchronization during production updates.
    
    \nAs the number of services grew, so did the number of pull requests needing approval and merging. This situation, inevitably, made our update process more prone to human error. We've come to the realization that despite the advantages of our current system, a new solution is needed to mitigate these risks and streamline our processes. This blog post delves into the challenges we've encountered in managing multiple repositories in our Kubernetes and Lambda architecture, and the exploration of possible solutions to enhance our productivity, efficiency, and error-proofing our release process. 
    
    \n## Current CICD Pipeline
    
    \nOur CICD pipeline is chiefly powered by the AWS Cloud Development Kit (AWS CDK), an open-source software development framework and GitHub Actions. 
    
    \nWe've adopted AWS CDK for its excellent provisioning and management capabilities for cloud infrastructure resources. The AWS CDK's ability to define cloud infrastructure in code and provision it through AWS CloudFormation is instrumental in seamlessly deploying and managing our many AWS resources including Lambda functions, Amazon Elastic Kubernetes Service (EKS) clusters, Load Balancers and many other more.
    
    \nEach of our repositories is integrated with GitHub Actions, GitHub's automation and CI/CD platform. GitHub Actions provides an efficient way to automate a wide range of processes tied to our repositories, from simple commit checks to complex build and deployment processes. We have GitHub Actions workflow for each \`develop\` and \`master\` branch, initiated on push. 
    
    \nThe first step in our GitHub Actions workflow is to create a Docker image. All our applications code is built using Docker image, it is pivotal to our operations, allowing us to package an application with everything it needs to run, including libraries, system tools, code, and runtime. Once the Docker image is built, the resulting image is pushed to Amazon Elastic Container Registry (ECR).
    
    \nThe next step is conditional, depending on the type of service tied to the repository. For Lambda functions, we use the newly created Docker image to update the corresponding Lambda function. We take advantage of AWS Lambda's ability to package and deploy functions as container images, a feature that enables easier operational management, deployment, and packaging of the functions.
    
    \nConversely, for services running on our EKS cluster, the newly built Docker image is used to update the deployment manifests of the corresponding Kubernetes services. By doing so, we ensure the latest version of the service gets rolled out across our Kubernetes infrastructure.
    
    \n\`\`\`
    current cicd architecture image
    \n\`\`\`
    
    \nThe pipeline's architecture, although streamlined, emphasizes the challenges we face. Managing each service's distinct repository and its corresponding pipelines independently has led to synchronization issues during production updates. It's this struggle that motivates us to look for innovative solutions to maintain our microservices principle while improving our overall CI/CD process. As we move forward, we'll explore potential solutions to mitigate these complexities and enhance our operational efficiency.
    
    \n## Solution
    
    \nOur primary objective is to coordinate simultaneous service deployment across all microservices, effectively reducing the potential for human error. By ensuring that all services are updated together, we aim to sidestep the synchronization issues we've previously encountered. Our solution builds on the tools and workflows we're already using, enhancing them rather than replacing them.
    
    \nWe've identified AWS CDK as a single source of truth for our infrastructure. It's from here that we want to centrally control and coordinate our deployments.
    
    \n\`\`\`
    - add more details on using CDK as a single source of truth. 
    - previously we had seperate infrastructure defined for each environment stack, but since the service is becoming bigger and infrastructure became bigger, there were too many code duplications, and we had to refactor the whole infrastructure code. 
    - This was one of the benefit of IaC I noticed, it was fairly easy to make sure infrastructure between develop and production server is consistent.
    \n\`\`\`
    
    \nOur approach involves bifurcating our CI/CD pipelines based on the environment: one for the development server and another for the production server.
    
    \nFor the development server, we'll continue to leverage individual CI/CD pipelines for each microservice. This approach aligns well with the microservices principle, ensuring isolated development, testing, and deployment cycles. By having independent pipelines, developers can freely work on features or fixes without disturbing the whole ecosystem.
    
    \nThe production server, on the other hand, will operate differently to accommodate our two-week release schedule. Given the frequency of updates, we believe a coordinated release of all services using the CDK repository (similar to a monorepo) would be more effective. This approach allows us to ensure all services are updated simultaneously, eliminating the risk of out-of-sync services or overlooked updates.
    
    \nIn this new approach, the GitHub Actions workflow on the \`master\` branch of each service's repository will focus solely on creating the Docker image and pushing it to the ECR repository. The responsibility of deploying these updates to the production environment will be shifted to the CDK repository.
    
    \nWe have implemented a new GitHub Actions workflow within the CDK repository that will pull the latest Docker images from the ECR repository and deploy them to the respective services. This workflow acts as the unified orchestrator, pulling in the latest changes from all microservices and deploying them together, ensuring the synchronization of our service updates.
    
    \n\`\`\`
    new CICD diagram
    \n\`\`\`
    
    \nOur solution aims to marry the benefits of microservices with the coherence of a monolithic architecture. This hybrid approach, we believe, will better serve our CI/CD needs, mitigating the complexities we've been facing.
    `,
  },
];

export default dummyPosts;
