pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                // Get some code from a GitHub repository
                echo 'Hello!'
            }
        }
        stage('deleteWorkspace') {
            steps {
                deleteDir()
            }
        }

         stage('clone') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'main',
                url: 'https://github.com/pwujczyk/ProductivityTools.GoogleCloudNetworking.git'
            }
        }
       
        stage('DeleteAllconfigurationDir') {
            steps {
                bat('if exist "/home/pawel/bin/ProductivityTools.GoogleCloudNetworking" RMDIR /Q/S "/home/pawel/bin/ProductivityTools.GoogleCloudNetworking"')
            }
        }
		
		
		
        stage('Copy the page') {
            steps {
				script{
                    sh 'cp -r /var/lib/jenkins/workspace/ProductivityTools.GoogleCloudNetworking /home/pawel/bin/ProductivityTools.GoogleCloudNetworking
                }
            }
        }


        stage('byebye') {
            steps {
                // Get some code from a GitHub repository
                echo 'bye bye'
            }
        }
    }
}
