import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';

// Rutas hijas de PostsModule (se cargan en /posts)
// OJO: "new" va antes que ":id" para que no se confunda con un id.
const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'new', component: PostFormComponent },
  { path: ':id', component: PostDetailComponent },
  { path: ':id/edit', component: PostFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
