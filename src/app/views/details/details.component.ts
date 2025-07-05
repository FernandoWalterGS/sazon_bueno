import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  bootstrapAlarmFill,
  bootstrapArrowBarUp,
  bootstrapBarChartFill,
  bootstrapChatSquareText,
  bootstrapClock,
  bootstrapPersonCircle,
  bootstrapPersonFillUp,
  bootstrapSend,
  bootstrapStarFill,
  bootstrapTagFill,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommentComponent } from '../../components/comment/comment.component';
import { MessageComponent } from '../../components/message/message.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { CommentService } from '../../services/comment/comment.service';
import { RatingService } from '../../services/rating/rating.service';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-details',
  standalone: true,
  providers: [
    provideIcons({
      bootstrapArrowBarUp,
      bootstrapClock,
      bootstrapTagFill,
      bootstrapBarChartFill,
      bootstrapChatSquareText,
      bootstrapSend,
      bootstrapPersonCircle,
      bootstrapStarFill,
      bootstrapAlarmFill,
      bootstrapPersonFillUp,
    }),
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [
    NgIcon,
    MessageComponent,
    CommentComponent,
    FormsModule,
    RatingComponent,
    DecimalPipe,
    TitleCasePipe,
  ],
})
export class DetailsComponent implements OnInit {
  data: any = [];
  comments: any = [];
  comment: string = '';
  id = this.route.snapshot.params['id'];
  ratingAccount: number = 0;
  avgByRecipe: any = 0;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.getRatingByaccountAndRecipe();
    this.dataDetail();
    this.dataComments();
    this.avgData();
  }

  dataDetail(): void {
    this.recipeService.getById(this.id).subscribe((data) => {
      this.data = data;
    });
  }

  dataComments(): void {
    this.commentService.getAllCommentRecipe(this.id).subscribe((data) => {
      this.comments = data;
    });
  }

  avgData() {
    this.ratingService
      .getByAccountAndRecipe(Number(localStorage.getItem('id')), this.id)
      .subscribe((data: any) => {
        this.avgByRecipe = data.rating;
      });
  }

  getRatingByaccountAndRecipe(): void {
    this.ratingService
      .getByAccountAndRecipe(Number(localStorage.getItem('id')), this.id)
      .subscribe((data: any) => {
        this.ratingAccount = data.rating;
      });
  }

  registerComment() {
    this.commentService
      .commentRegister(
        this.comment,
        this.id,
        Number(localStorage.getItem('id'))
      )
      .subscribe((data) => {
        this.dataComments();
      });

    this.comment = '';
  }

  receiveRating(rating: any) {
    this.ratingService
      .ratingRegister(
        rating,
        Number(localStorage.getItem('id')),
        Number(this.id)
      )
      .subscribe((data: any) => {
        this.ratingAccount = data.rating;
        this.avgData(); // Update average after rating
      });
  }
}
