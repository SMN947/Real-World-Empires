import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: "root",
})
    
export class Apps {
    constructor(private login: LoginService) {}
    get() {
        return {
            rebel: {
                title: "Rebel",
                expanded: false,
                icon: 'car',
                children: [
                    {
                        title: "WAT Requester",
                        link: "/ne/rebel/wat",
                        desc: "Displays Bliss Tags for each site by hierarchy and allows operations to make tagging requests",
                        roles: [],
                        lobs: ["Staff"]
                    },{
                        title: "Bonus Queries",
                        link: "/ne/rebel/bonus-queries",
                        desc: "Queries to calculate the Rebel bonuses",
                        roles: ["Reporting Analyst",
                            "Reporting Coordinator",
                            "Reporting Jr",
                            "Reporting Manager",
                            "Reporting Sr",],
                        lobs: []
                    },{
                        title: "Power BI Reports Directory",
                        link: "/ne/rebel/pbi",
                        desc: "Find all our Power BI reports",
                        roles: [],
                        lobs: ['Staff']
                    },{
                        title: "LatAm/EMEA Documents Form",
                        link: "/ne/rebel/form-docs",
                        desc: "Real-Time tracker for LatAm and EMEA Documents",
                        roles: ['*'],
                        lobs: []
                    },{
                        title: "Freight Sla",
                        link: "/ne/rebel/freight-Sla",
                        desc: "Real-Time freight SL",
                        roles: ['*'],
                        lobs: []
                    }
                ]
            }, stripe: {
                title: "Stripe",
                expanded: false,
                icon: 'credit-card',
                children: [
                    {
                        title: "Schedules Converter",
                        link: "/ne/stripe/schedules",
                        desc: "Converts the WFM schedules file to a ready to upload Assembled file",
                        roles: ['*'],
                        lobs: ['*']
                    },{
                        title: "Risk Tracker",
                        link: "/ne/stripe/risk-tracker",
                        desc: "Risk Tracker",
                        roles: ['*'],
                        lobs: ['*']
                    },{
                        title: "Capital Tracker",
                        link: "/ne/stripe/capital-tracker",
                        desc: "Capital Tracker",
                        roles: ['*'],
                        lobs: ['*']
                    }
                ]
            }, tiktok: {
                title: "TikTok",
                expanded: false,
                icon: 'credit-card',
                children: [
                    
                ]
            }
        }
    }
    valAccess(url) {
        var userData:any = this.login.getUser().ne;
        var urlTree = url.split('/');
        if (urlTree[2] != 'main' && urlTree[2] != 'admin') {
            var thisCam = userData.filter((el) => {
                if (el.Mercado.toLowerCase() == urlTree[2].toLowerCase()) {
                    return el
                }
            });
            console.log(thisCam);
            var appData = this.get()[urlTree[2].toLowerCase()].children.filter((el) => {
                if (el.link == url) {
                    return el;
                }
            });
            appData = appData[0]
            if (appData.lobs.length != 0 && appData.roles.length != 0) {
                if (this.isAllowed(thisCam[0].LOB, appData.lobs) && this.isAllowed(thisCam[0].Role, appData.roles)) {
                    return true;
                } else {
                    return false;
                }
            }
            if (appData.lobs.length != 0) {
                if (this.isAllowed(thisCam[0].LOB, appData.lobs)) {
                    return true;
                } else {
                    return false;
                }
            }
            if (appData.roles.length != 0) {
                if (this.isAllowed(thisCam[0].Role, appData.roles)) {
                    return true;
                } else {
                    return false;
                }
            }

        } else {
            return true;
        }
    }

    isAllowed(userData: any, appData: any) {
        if (appData[0] == '*') {
            return true;
        }
        var flag = appData.filter((el:any) => {
            if (el == userData) {
                return true;
            }
        });
        if (flag.length != 0) {
            return true;
        } else { 
            return false;
        }
    }
}