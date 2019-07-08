import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-google-fit',
    templateUrl: './google-fit.component.html',
    styleUrls: ['./google-fit.component.scss']
})
export class GoogleFitComponent implements OnInit {

    code: string;
    accessToken: string;
    refreshToken: string;

    fitAPIUrl = 'https://www.googleapis.com/fitness/v1/users/me/dataSources';
    stepsDataSet = 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps';
    intFields = 'point/value/intVal';

    tokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
    clientId = '818008692418-sr6e8tma8m50695tanb20h6hrdkp3389.apps.googleusercontent.com';
    clientSecret = 'JzkwXxE52D-mm6wFPxC0ZS0O';

    logs = '';

    fitResponse = {
        steps: {
            value: 0,
            sessions: 0
        }
    }
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.addLog('Fit Component loaded')
        this.route.queryParamMap.subscribe(queryParam => {
            this.code = queryParam.get('code');
            this.addLog(`Retrieved access code = ${this.code}`);

            const data = new HttpParams({
                fromObject: {
                    code: this.code,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:4200/auth-complete/google-fit',
                    scope: ''
                }
            });
            const header = {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Cache-Control', 'no-cache')
            }

            this.addLog('Retrieving access token from google')
            this.http.post(this.tokenUrl, data, header)
                .pipe(map(this.extractData))
                .subscribe(
                    (response: any) => {
                        this.accessToken = response['access_token'];
                        this.refreshToken = response['refresh_token'];
                        this.addLog(`Access token retrieved = ${this.accessToken}`);
                        this.getStepsFromGoogleFit();
                    },
                    error => {
                        this.addLog(`Error occured while calling the retrieve token API.`);
                        this.addLog(JSON.stringify(error));
                    }
                );
        });
    }

    getStepsFromGoogleFit() {
        const currentDate = new Date();
        const startTime = currentDate.getMilliseconds() * 1000000;
        currentDate.setMonth(currentDate.getMonth() -1);
        const endTime = currentDate.getMilliseconds() * 1000000;

        const headers = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.accessToken}`
            })
        }
        this.addLog('Retrieving steps from google fit');
        this.addLog('Dataset ID is Hardcoded.')
        this.http.get(`${this.fitAPIUrl}/${this.stepsDataSet}/datasets/1562588836773000000-1560105000000000000`, headers)
            .pipe(map(this.extractData))
            .subscribe(
                (steps: []) => {
                    this.addLog('Retrieved steps data from google fit')
                    steps['point'].forEach(step => {
                        this.fitResponse.steps.value += step.value[0].intVal;
                        this.fitResponse.steps.sessions += 1;
                    })
                    this.addLog('Steps data aggregation completed');
                },
                error => {
                    this.addLog('Error occured while retrieving the steps data from google fit')
                    this.addLog(JSON.stringify(error));
                }
            );

    }
    extractData(res: Response) {
        let body = res;
        return body || {};
    }

    addLog(text: string) {
        this.logs += `\n${text}`;
    }
}
