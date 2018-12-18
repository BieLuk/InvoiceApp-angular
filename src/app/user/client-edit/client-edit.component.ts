import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';
import {map} from 'rxjs/operators';
import {ClientModel} from '../../shared/model/client/client.model';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  clientId: number;
  clientModel: ClientModel;

  constructor(private route: ActivatedRoute,
              private clientApiService: ClientApiService,
              private clientMapperService: ClientMapperService) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.queryParams['id'];

    this.loadClientDetails();
  }

  loadClientDetails() {
    this.clientApiService.getClientDetailsById(this.clientId).pipe(
      map(response => response.data),
      map(clientDto => this.clientMapperService.mapDtoToModel(clientDto))
    ).subscribe(client => this.clientModel = client);
  }

  updateClient() {
    this.clientApiService.updateClient(this.clientMapperService.mapModelToDto(this.clientModel))
      .subscribe(
        () => {
          this.loadClientDetails();
        }
      );
  }

}
