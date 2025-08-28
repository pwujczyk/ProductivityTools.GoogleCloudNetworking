pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                // Get some code from a GitHub repository
                echo 'Hello!'
            }
        }

        stage('Identify User') {
            steps {
                script {
                    echo "Sprawdzanie, jako który użytkownik Jenkins wykonuje komendy..."

                    // Komenda whoami
                    echo "Nazwa użytkownika (whoami):"
                    sh 'whoami'

                    // Komenda id (bardziej szczegółowa)
                    echo "Szczegóły użytkownika (id):"
                    sh 'id'

                    echo "Zakończono identyfikację użytkownika."
                }
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

        stage('NPM Installx') {
            steps {
                script {
                    echo "Installing NPM dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('build') {
            steps {
                script {
                    echo "Installing NPM dependencies..."
                    sh 'npm run build'
                }
            }
        }

         stage('DeleteAllconfigurationDir') {
            steps {
                 script {
                    def directoryToRemove = '/srv/jenkins/pt.googlecloudnetworking'
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
                script{
                    def sourceDir='/var/lib/jenkins/workspace/PT.GoogleCloudNetworking'
                    def destinationDir='/srv/jenkins/'
                    //sh "mkdir -p ${destinationDir}"

                    sh "rsync -av --exclude='.git/' ${sourceDir}/ ${destinationDir}"
                }
            }
        }  

         stage('pm2 list') {
            steps {
                script{
                    sh '''
                    pm2 l
                    '''
                }
            }
        }  

          stage('start page') {
            steps {
                script{
                    sh '''
                    if pm2 l | grep -q gcpnetworking; then
                        echo "gcpnetworking process found. Deleting it before starting a new one."
                        pm2 delete gcpnetworking
                    else
                        echo "gcpnetworking process not found. Starting a new one."
                    fi
                    
                    pm2 start npm --name "gcpnetworking" -- start
                    pm2 save
                    '''
                }
            }
        }  
    }
}
