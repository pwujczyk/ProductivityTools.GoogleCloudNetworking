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
                 script {
                    def directoryToRemove = '/home/pawel/bin/ProductivityTools.GoogleCloudNetworking/'
                    echo "Removing directory: '${directoryToRemove}'"

                    echo "Checking if directory '${directoryToRemove}' exists..."
                    def dirExists = sh(script: "test -d ${directoryToRemove}", returnStatus: true) == 0

                    if (dirExists) {
                         echo "removing directory."

                        sh "rm -rf ${directoryToRemove}"
                    }

                    // --- Verify the removal operation ---
                    echo "Checking if directory '${directoryToRemove}' still exists:"
                    // 'test -d' checks if a path is a directory.
                    // '|| true' prevents the step from failing if the directory is already gone.
                    sh "test -d ${directoryToRemove} && echo 'Directory still exists (Error!)' || echo 'Directory successfully removed.'"

                    echo "Directory removal complete."
                }
            }
        }
		
		
		
        stage('Copy the page') {
            steps {
				script {
                    def sourceDir='/var/lib/jenkins/workspace/ProductivityTools.GoogleCloudNetworking'
                    def destinationDir='/home/pawel/bin/ProductivityTools.GoogleCloudNetworking/'
                    echo "Creating destination base directory: ${destinationDir}"
                    sh "mkdir -p '${destinationDir}'"
                    
                    sh "cp -r ${sourceDir} ${destinationDir}"
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
