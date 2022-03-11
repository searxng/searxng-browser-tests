'use strict';

const fs = require('fs');
const path = require('path');

const file_names = ['alpinejs.js', 'robots.txt', 'screenshots.html', 'sitemap.xml'];


function read_json_file(file_name) {
    let rawdata = fs.readFileSync(file_name);
    return JSON.parse(rawdata);    
}

const all_attachments = []
const suites = read_json_file('allure-report/data/suites.json');
for(let config of suites.children) {
    for(let suite of config.children) {
        for(let test_case of suite.children) {
            const c = {
                config: config.name,
                suite: suite.name,
                test_case: test_case.name,
                attachments: []
            }
            const test_case_data = read_json_file('allure-report/data/test-cases/' + test_case.uid + '.json');
            for(let attachment of test_case_data.testStage.attachments) {
                c.attachments.push(attachment);
            }
            all_attachments.push(c);
        }
    }
}

let data = JSON.stringify(all_attachments);
fs.writeFileSync('allure-report/data/all_attachments.json', data);

/* copy static files */
for(const file_name of file_names) {
    fs.copyFileSync(path.join('screenshots', file_name), path.join('allure-report', file_name));
}

/* create symbolic links to the screenshots */
for(let attachments of all_attachments) {
    const config_name = attachments.config.toLowerCase().replaceAll(' ', '_');
    const test_case_name = attachments.test_case.toLowerCase().replaceAll(' ', '_');
    const directory_name = path.join('allure-report', 'screenshots', config_name, test_case_name);
    fs.mkdirSync(directory_name, { recursive: true });
    for(let entry of attachments.attachments) {
        const source_file_name = path.join('allure-report', 'data', 'attachments', entry.source);
        const ext = path.extname(source_file_name);
        const dest_file_name = path.join(directory_name, entry.name + ext);
        fs.copyFileSync(source_file_name, dest_file_name);
    }
    
    
}
