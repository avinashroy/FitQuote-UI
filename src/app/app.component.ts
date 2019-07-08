import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'FitQuote-UI';
    //   url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=818008692418-sr6e8tma8m50695tanb20h6hrdkp3389.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/fitness.activity.read+https://www.googleapis.com/auth/fitness.blood_glucose.read+https://www.googleapis.com/auth/fitness.blood_pressure.read+https://www.googleapis.com/auth/fitness.body.read+https://www.googleapis.com/auth/fitness.body_temperature.read+https://www.googleapis.com/auth/fitness.location.read+https://www.googleapis.com/auth/fitness.nutrition.read+https://www.googleapis.com/auth/fitness.oxygen_saturation.read+https://www.googleapis.com/auth/fitness.reproductive_health.read&redirect_uri=http://localhost:4200/auth-complete/google-fit&access_type=offline';
    url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=818008692418-sr6e8tma8m50695tanb20h6hrdkp3389.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/fitness.activity.read&redirect_uri=http://localhost:4200/auth-complete/google-fit&access_type=offline';
}
