pipeline {
    agent any
    
    stages {
        
        stage("Fetch Code From Git"){
            steps{
                git url: "https://github.com/robinthakur00/calculator-app-react.git", branch: "master"
            }
        }
        stage("Build the Image"){
            steps{
                sh "docker build -t calculator-app-react ."
            }
        }
        stage("Push to DockerHub"){
            steps{
                withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                sh "docker tag calculator-app-react:latest ${env.dockerHubUser}/calculator-app-react:latest"
                sh "docker push ${env.dockerHubUser}/calculator-app-react:latest"
                }
            }
        }
        stage("Deploy the application"){
            steps{
                sh "docker-compose down && docker-compose up -d"
            }
        }
    }
}