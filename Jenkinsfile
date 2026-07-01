pipeline {
    agent any

    stages {

        stage("Code") {
            steps {
                git url: "https://github.com/ahsanmustafa11-a/docker-compose-python-flask.git", branch: "main"
            }
        }

        stage("Test") {
            steps {
                echo "Testing the Code"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t my-flask-app ."
            }
        }

        stage("Push to DockerHub") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerpush',
                    usernameVariable: 'dockerpushuser',
                    passwordVariable: 'dockerpushPass'
                )]) {

                    sh """
                        docker login -u ${dockerpushuser} -p ${dockerpushPass}
                        docker tag my-flask-app ${dockerpushuser}/multi-tier-flask-app:latest
                        docker push ${dockerpushuser}/multi-tier-flask-app:latest
                    """
                }
            }
        }

        stage("Run Container") {
            steps {
                sh """
                    docker run -p 5000:5000 my-flask-app
                """
            }
        }
    }
}
