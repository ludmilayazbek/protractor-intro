pipeline {
    agent any
    stages {
        stage('#1 git') {
            steps {
                git 'https://github.com/brunohafonso95/protractor-intro.git'   
            }
        }
        stage('#2 download dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('#3') {
            steps {
                sh 'npm run driver-update'
            }
        }
        stage('#4 automated tests') {
            steps {
                sh 'npm run test'
            }
        }
    }
    post {
        always {
            cucumber fileIncludePattern: '**/*.json', sortingMethod: 'ALPHABETICAL'
            junit 'src/**/*.xml'
            script {
                sh 'rm evidence-files.zip'
                zip archive: true, dir: 'src/reports', glob: '', zipFile: 'evidence-files.zip'
            }
        }
    }
}
