import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_services/statistics.service';
import { ToastrService } from 'ngx-toastr';
declare var $ : any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  top10Data: any[];
  bookLoansByGenreData: any[] = [];

  view: any[] = [700, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  trimLabels = false;
  legendTitle = 'Legenda';
  maxLabelLength = 20;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC' ]
  };

  constructor(
    private statisticsService: StatisticsService,
    private toastr: ToastrService,
  ) {
  }

  // onSelect(event) {
  //   console.log(event);
  // }

  ngOnInit() {
    this.getTop10Readers();
    this.getLoansByGenre();
    $(document).ready(function() {
      var navLink = $('.nav-link')[2];
      $('.nav-link').each(function(this) {
        $(this).removeClass('active');
      });
      $(navLink).addClass('active');
    });
  }

  getTop10Readers(): void {
    this.statisticsService.getTop10Readers()
      .subscribe(resp => {
        this.top10Data = resp.body;
      }, error => {
        this.toastr.error('Nie udało się pobrać top 10 najaktywniejszych czytelników.');
        $("#loading-spinner").hide();
      });
  }

  getLoansByGenre(): void {
    this.statisticsService.getLoansByGenre()
      .subscribe(resp => {
        this.bookLoansByGenreData = resp.body;
        
        Object.assign(this, this.bookLoansByGenreData );
        console.log('Zaladowano dane do wykresu');
        //console.log(resp.body);
      }, error => {
        this.toastr.error('Nie udało się załadować wykresu.');
        $("#loading-spinner").hide();
      });
  }

}
