import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Result {
  text: string;
  sentiment: 'positif' | 'neutre' | 'negatif';
  emoji: string;
  confidence: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private apiUrl = 'http://localhost:3001/api/classify';

  inputText = '';
  results: Result[] = [];
  loading = false;
  errorMsg = '';

  submit() {
    const lines = this.inputText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      this.errorMsg = 'Colle au moins un avis (une ligne = un avis).';
      return;
    }

    this.errorMsg = '';
    this.results = [];
    this.loading = true;

    this.http.post<{ results: Result[] }>(this.apiUrl, { texts: lines }).subscribe({
      next: (res) => {
        this.results = res.results;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'Erreur de connexion au serveur.';
        this.loading = false;
      },
    });
  }

  constructor(private http: HttpClient) {}
}
