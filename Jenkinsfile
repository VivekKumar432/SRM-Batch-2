// pipeline {
//     agent any

//     environment {
//         dockerRegistry = 'https://index.docker.io/v1/'
//         dockerCreds = credentials('docker-hub-credentials')
//         backendImage = 'auth-backend'
//         frontendImage = 'auth-frontend'
//     }

      
//     stages {

//          stage('Check .env File') {
//             steps {
//                 script {
//                     def envFilePath = 'C://ProgramData//Jenkins//.jenkins//workspace//user-auth pipeline//backend//.env'
//                     if (fileExists(envFilePath)) {
//                         echo "The .env file exists. Reading file..."
//                     } else {
//                         error "The .env file does not exist at path: ${envFilePath}"
//                     }
//                 }
//             }
//         }
//         stage('Load Environment Variables') {
//             steps {
//                 script {
//                     def envFilePath = 'C://ProgramData//Jenkins//.jenkins//workspace//user-auth pipeline//backend//.env'
//                     if (fileExists(envFilePath)) {
//                         def envContent = readFile(envFilePath)
//                         def envVars = envContent.split('\n').collect { line ->
//                             if (line.trim()) {
//                                 def parts = line.split('=')
//                                 def key = parts[0].trim()
//                                 def value = parts[1].trim()
//                                 return "${key}=${value}"
//                             }
//                         }.findAll { it != null }
//                         withEnv(envVars) {
//                             // Your steps that require the environment variables
//                             echo "Environment variables loaded: ${envVars}"
//                             // Place your other steps here
//                         }
//                     } else {
//                         error "The .env file does not exist at path: ${envFilePath}"
//                     }
//                 }
//             }
//         }
        

//         stage('Build Backend') {
//             steps {
//                 script {
//                     def backendPath = 'backend'
//                     if (fileExists(backendPath)) {
//                         echo "Building backend image"
//                         bat "docker build -t ${backendImage}:latest ${backendPath}" // Build the image
//                         bat "docker tag ${backendImage}:latest thepurpleaxe/${backendImage}:latest" // Tag image
//                     } else {
//                         error "Backend directory not found"
//                     }
//                 }
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 script {
//                     def frontendPath = 'frontend'
//                     if (fileExists(frontendPath)) {
//                         echo "Building frontend image"
//                         bat "docker build -t ${frontendImage}:latest ${frontendPath}" // Build the image
//                         bat "docker tag ${frontendImage}:latest thepurpleaxe/${frontendImage}:latest" // Tag image
//                     } else {
//                         error "Frontend directory not found"
//                     }
//                 }
//             }
//         }

//         stage('Push Backend') {
//             steps {
//                 script {
//                     echo "Preparing to push backend image"
//                     docker.withRegistry(dockerRegistry, dockerCreds) {
//                         bat "docker push thepurpleaxe/${backendImage}:latest"
//                     }
//                 }
//             }
//         }

//         stage('Push Frontend') {
//             steps {
//                 script {
//                     echo "Preparing to push frontend image"
//                     docker.withRegistry(dockerRegistry, dockerCreds) {
//                         bat "docker push thepurpleaxe/${frontendImage}:latest"
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo "PIPELINE SUCCESS"
//         }
//         failure {
//             echo "PIPELINE FAILED"
//         }
//     }
// }

pipeline {
    agent any 
    environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }
    stages { 
        stage('SCM Checkout') {
            steps{
             git branch: 'main',
                    credentialsId: 'git-hub-credentials',
                    url: 'https://github.com/Harpreet1423/Harpreet-Batch-2.git'
            }
        }

        stage('Build backend docker image') {
            steps {  
                sh 'docker build -t backend:$BUILD_NUMBER .'
            }
        }

        stage('Build frontend docker image') {
            steps {  
                sh 'docker build -t frontend:$BUILD_NUMBER .'
            }
        }


        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('push backend image') {
            steps{
                sh 'docker push backend:$BUILD_NUMBER'
            }
        }

         stage('push frontend image') {
            steps{
                sh 'docker push frontend:$BUILD_NUMBER'
            }
        }

}
post {
        always {
            sh 'docker logout'
        }
    }
}