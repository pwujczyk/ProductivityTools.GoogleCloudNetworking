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

         stage('DeleteAllconfigurationDir') {
            steps {
                 script {
                    def directoryToRemove = '/var/lib/jenkins/workspace/bin/ProductivityTools.GoogleCloudNetworking/'
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
                dir('/home/pawel/bin/pt.networking'){
                     writeFile file:'dummy', text:''
                }
            }
        }

    }
}
