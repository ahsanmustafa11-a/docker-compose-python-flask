pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ahsanmustafa11-a/docker-compose-python-flask.git'
            }
        }

        stage('Test') {
            steps {
                echo "Running application tests..."
                // Add your test commands here
            }
        }

        stage('Build Services') {
            steps {
                sh '''
                    docker-compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker-compose down || true
                    docker-compose up -d --build
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker-compose ps
                '''
            }
        }
    }

    post {
        success {
            echo "Application deployed successfully."
        }

        failure {
            echo "Pipeline failed."
        }

        always {
            sh 'docker-compose ps || true'
        }
    }
}
