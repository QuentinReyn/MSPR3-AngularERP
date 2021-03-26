import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { skipWhile } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { FileUploadService } from './file-upload.service';

describe('FileUploadService', () => {
  let service: FileUploadService;
  const createFakeFile = (fileName: string = 'fileName'): File => {
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = fileName;
    return <File>blob;
  };
  let httpTestingController: HttpTestingController;
  //let mockFile :FileUpload = new FileUpload();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FileUploadService);
    httpTestingController  = TestBed.get(HttpTestingController);
  });


  // it('should upload the file - checkFileExist = true', () => {
  //   spyOn(component, 'upload').and.returnValue();
  //   spyOn(service,'pushFileToStorage').and.callThrough();
  //   component.upload();
  //   expect(service.pushFileToStorage(createFakeFile)).toHaveBeenCalled();
  // });
  
  // it('should upload the file - checkFileExist = false', () => {
  //   spyOn(component, 'upload').and.returnValue();
  //   spyOn(service,'pushFileToStorage').and.callThrough();
  //   component.upload();
  //   expect(service.pushFileToStorage(mockFile)).toHaveBeenCalledTimes(0);
  // });

  // it('#upload should report the progress of the file upload', (done: DoneFn) => {
  //   // Trigger the file upload and subscribe for results
  //   service.pushFileToStorage(mockFile).pipe(
  //     // Discard the first response
  //     skipWhile((progress: number) => progress === 0)
  //   ).subscribe(
  //     (progress: number) => {
  //       // Define what we expect after receiving the progress response
  //       expect(progress).toEqual(70);
  //       done();
  //     }
  //   );

    // Match a request to service.url
    // const req = httpTestingController.expectOne(service.url);
    // expect(req.request.method).toEqual('POST');
    // // Respond with a mocked UploadProgress HttpEvent
    // req.event({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 });
  // });
});

