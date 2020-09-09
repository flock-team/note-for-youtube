import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/interfaces/video';

@Component({
  selector: 'app-video-addition',
  templateUrl: './video-addition.component.html',
  styleUrls: ['./video-addition.component.scss'],
})
export class VideoAdditionComponent implements OnInit {
  private uid = this.authService.uid;
  private listId = this.route.snapshot.paramMap.get('id');

  isMovieEditable: boolean;
  form = this.fb.group({
    videoUrlId: ['https://www.youtube.com/watch?v=4OrCA1OInoo'],
    playlistUrlId: [''],
  });

  get videoUrlId(): FormControl {
    return this.form.get('videoUrlId') as FormControl;
  }
  get playlistUrlId(): FormControl {
    return this.form.get('playlistUrlId') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addVideo() {
    const videoUrl = this.videoUrlId.value.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
    );
    this.videoService.getYoutubeVideo(videoUrl);
    console.log(this.videoService.videoItems);
  }
}
