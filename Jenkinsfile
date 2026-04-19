pipeline {
    agent any

    environment {
        DOCKER_USER = "boomadevis"
        IMAGE_TAG = "v2"
    }

    stages {

        // ✅ 2. Build Docker Images
        stage('Build Images') {
            steps {
                bat 'docker build -t %DOCKER_USER%/frontend:%IMAGE_TAG% ./frontend'
                bat 'docker build -t %DOCKER_USER%/backend:%IMAGE_TAG% ./backend'
            }
        }

        // ✅ 3. Docker Login + Push
        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-cred',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    // 🔥 SAFEST LOGIN METHOD (Windows fix)
                    bat '''
                    echo %PASS% > pass.txt
                    type pass.txt | docker login -u %USER% --password-stdin
                    del pass.txt
                    '''

                    bat 'docker push %DOCKER_USER%/frontend:%IMAGE_TAG%'
                    bat 'docker push %DOCKER_USER%/backend:%IMAGE_TAG%'
                }
            }
        }

        // ✅ 4. Deploy to Kubernetes
        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/'
                bat 'kubectl rollout restart deployment/frontend'
                bat 'kubectl rollout restart deployment/backend'
            }
        }

  
    }
}