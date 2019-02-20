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
        stage('#3 automated tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: './src/reports/reportFiles', reportFiles: 'chart-results.html', reportName: 'HTML Report', reportTitles: 'Test Results'])
            cucumber fileIncludePattern: 'src/**/*.json', sortingMethod: 'ALPHABETICAL'
            junit 'src/**/*.xml'
            script {
                zip archive: true, dir: 'src/reports', glob: '', zipFile: 'evidence-files.zip'
            }
        }
    }
}
