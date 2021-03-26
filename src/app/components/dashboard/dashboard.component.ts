import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards;
  constructor() {


    this.cards = [
      {
        'title': 'Elements Developer',
        'hex': "6877F2",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': true,
        'progress': 100,
        'timesCompleted': 2,
        'inProgress': false,
        'preReqs': []
      },
      {
        'title': 'Layout Developer',
        'hex': "FF765E",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': true,
        'progress': 20,
        'timesCompleted': 0,
        'inProgress': true,
        'preReqs': []
      },
      {
        'title': 'Events Handler',
        'hex': "DD3BB9",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': true,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': []
      },
      {
        'title': 'Data Binder',
        'hex': "FFE248",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': true,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': []
      },
      {
        'title': 'Component Manager',
        'hex': "DB65F9",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Layout Developer', 'Events Handler', 'Data Binder']
      },
      {
        'title': 'Page Layout',
        'hex': "113409",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Component Manager']
      },
      {
        'title': 'Page Data Selectors',
        'hex': "FF8D4D",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Component Manager']
      },
      {
        'title': 'Page Actions',
        'hex': "CCF99F",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Component Manager']
      },
      {
        'title': 'Page Manager',
        'hex': "43D1BA",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Component Manager', 'Page Layout', 'Page Data Selectors', 'Page Actions']
      },
      {
        'title': 'Site Setup',
        'hex': "F03333",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Page Manager']
      },
      {
        'title': 'Site Manager',
        'hex': "8AD143",
        'desc': 'In charge of managing roles associated with the creation of components. Writing more text in case the role description is longer.',
        'unlocked': false,
        'progress': 0,
        'timesCompleted': 0,
        'inProgress': false,
        'preReqs': ['Page Manager', 'Site Setup']
      },


    ]



  }

  ngOnInit() {
  }

  constructSrc(hexVal, size){
    const constructedVal = "https://icongr.am/material/hexagon.svg?size=" + size + "&color=" + hexVal;
    return constructedVal;

  }
  signUp() {
    console.log("signing up!")
  }
  resumeRole() {
    console.log("resuming your role")
  }
}

