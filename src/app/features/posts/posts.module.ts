import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';

// PostsModule: carga perezosa en /posts (protegido con authGuard)
@NgModule({
  declarations: [PostListComponent, PostDetailComponent, PostFormComponent],
  imports: [SharedModule, PostsRoutingModule],
})
export class PostsModule {}
