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

        stage('NPM Install') {
            steps {
                script {
                    echo "Installing NPM dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building the application..."
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def destinationDir = '/srv/jenkins/pt.googlecloudnetworking'
                    echo "Syncing files to ${destinationDir}..."
                    
                    // We ensure the destination directory exists and has correct permissions
                    sh "mkdir -p ${destinationDir}"
                    
                    // --delete ensures that files removed in Git are also removed on the server (important for the content/ folder)
                    // The trailing slash on ${env.WORKSPACE}/ is critical to copy contents, not the folder itself.
                    sh "rsync -av --delete --exclude='.git/' ${env.WORKSPACE}/ ${destinationDir}/"
                }
            }
        }

        stage('Restart App (PM2)') {
            steps {
                script {
                    sh '''
                    export PM2_HOME="/home/pawel/.pm2"
                    
                    cd /srv/jenkins/pt.googlecloudnetworking
                    
                    echo "Current PM2 status:"
                    pm2 status
                    
                    echo "Restarting gcpnetworking..."
                    # We try to delete first to ensure a clean start with new environment/cwd
                    pm2 delete gcpnetworking || true
                    
                    # Start the app. If port 3000 is blocked by a zombie process, 
                    # you might need to run 'fuser -k 3000/tcp' manually once.
                    pm2 start npm --name "gcpnetworking" -- start
                    
                    pm2 save
                    pm2 status
                    '''
                }
            }
        }
    }
}
