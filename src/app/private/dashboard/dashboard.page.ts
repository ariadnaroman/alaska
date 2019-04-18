import {AuthenticationService} from "../../services/authentication.service";
import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @ViewChild('canvas') canvasEl: ElementRef;
    private _CANVAS: any;
    private _CONTEXT: any;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    ionViewDidEnter() {
        this._CANVAS 		    = this.canvasEl.nativeElement;
        this._CANVAS.width  	= 500;
        this._CANVAS.height 	= 500;

        this.initialiseCanvas();
        this.drawCircle();

    }

    initialiseCanvas() : void
    {
        if(this._CANVAS.getContext)
        {
            this.setupCanvas();
        }
    }

    drawCircle() : void
    {
        this.clearCanvas();
        this._CONTEXT.beginPath();

        // x, y, radius, startAngle, endAngle
        this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 80, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth   = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
    }

    drawSquare() : void
    {
        this.clearCanvas();
        this._CONTEXT.beginPath();
        this._CONTEXT.rect(this._CANVAS.width/2 - 100, this._CANVAS.height/2 - 100, 200, 200);
        this._CONTEXT.lineWidth   = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
    }

    drawTriangle() : void
    {
        this.clearCanvas();
        this._CONTEXT.beginPath();
        this._CONTEXT.moveTo(this._CANVAS.width/2 - 100, this._CANVAS.height/2 + 100);
        this._CONTEXT.lineTo(this._CANVAS.width/2 + 100, this._CANVAS.height/2 + 100);
        this._CONTEXT.lineTo(this._CANVAS.width/2, this._CANVAS.height/2);
        this._CONTEXT.lineTo(this._CANVAS.width/2 -100, this._CANVAS.height/2 + 100);
        this._CONTEXT.lineWidth   = 1;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
    }

    setupCanvas() : void
    {
        this._CONTEXT = this._CANVAS.getContext('2d');
        this._CONTEXT.fillStyle = "#3e3e3e";
        this._CONTEXT.fillRect(0, 0, 500, 500);
    }

    clearCanvas() : void
    {
        this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
        this.setupCanvas();
    }
}
