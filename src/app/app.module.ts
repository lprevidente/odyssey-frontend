import {
  APP_INITIALIZER,
  InjectionToken,
  isDevMode,
  NgModule,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "@core/interceptors/auth.interceptor";
import { RefreshTokenInterceptor } from "@core/interceptors/refresh-token.interceptor";
import { MeService } from "@core/services/me.service";
import { Observable } from "rxjs";

export const BASE_PATH = new InjectionToken<string>("Base path for the API");

export function initApp(meService: MeService) {
  return (): Observable<void> => meService.getMe();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    {
      provide: BASE_PATH,
      useValue: environment.basePath,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [MeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
