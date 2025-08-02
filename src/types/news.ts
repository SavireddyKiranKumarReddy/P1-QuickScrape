import React from 'react';

export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  link: string;
  image_url: string | null;
  pubDate: string;
  source_id: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage: string;
}

export type TechDomain = 
  | "ALL"
  | "Cybersecurity"
  | "Artificial Intelligence"
  | "Data Science"
  | "AI & Machine Learning"
  | "Computer Science and Engineering"
  | "CS & Technology";

export type Theme = 'light' | 'dark';