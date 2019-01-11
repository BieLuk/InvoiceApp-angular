import {Component, OnInit} from '@angular/core';
import {ClientModel} from '../../shared/model/client/client.model';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {

  userId: number;
  clients: ClientModel[];
  dtOptions: any = {};

  constructor(private clientApiService: ClientApiService,
              private clientMapperService: ClientMapperService,
              private authApiService: AuthApiService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.authApiService.currentUserId;
    this.loadClients();

    this.dtOptions = {
      responsive: {
        details: {
          renderer: function (api, rowId, columns) {
            const data = $.map(columns, function(col, i) {
              return col.hidden ?
                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '"> ' +
                '<td style="padding-left: 25px; width: 300px">' + col.title + ':' + '</td> ' +
                '<td style="padding-left: 50px; width: 500px">' + col.data + '</td>' +
                '</tr>' :
                '';
            }).join('');
            return data ?
              $('<table/>').append( data ) :
              false;
          }
        }
      },
      columnDefs: [
        {
          targets: [3],
          orderable: false,
          searchable: false,
        },
        {
          targets: [4],
          orderable: false,
          searchable: false,
        },
      ],
      order: [[0, 'asc']],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Polish.json'
      },

    };

  }

  // TODO zmienić na this.userId
  private loadClients() {
    this.clientApiService.getClientsByUserId(1).pipe(
      map(response => response.data),
      map(clientsDto => clientsDto
      .map(clientDto => this.clientMapperService.mapDtoToModel(clientDto)))
    ).subscribe(clients => this.clients = clients);
  }

  navigateToClientDetailsEdit(clientId: number) {
    this.router.navigate(['user', 'clients', 'edit'], {queryParams: { id: clientId}});
  }

  deleteClient(clientId: number) {
    this.clientApiService.deleteClient(clientId).pipe(
      map(response => response.data)
    ).subscribe(
      () => this.loadClients()
      );
  }

}
