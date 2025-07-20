
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Calendar, User } from 'lucide-react';

const BlogSection = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const blogPosts = [
    {
      id: 1,
      title: 'Complete Guide to Everest Base Camp Trek',
      excerpt: 'Everything you need to know about trekking to the base of the world\'s highest mountain...',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop',
      category: 'Trekking',
      author: 'Rajesh Sharma',
      date: '2024-01-15',
      likes: 45,
      comments: 12,
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Best Time to Visit Nepal: A Season-by-Season Guide',
      excerpt: 'Discover when to visit Nepal for the perfect weather and unforgettable experiences...',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=250&fit=crop',
      category: 'Travel Tips',
      author: 'Priya Gurung',
      date: '2024-01-10',
      likes: 32,
      comments: 8,
      readTime: '6 min read'
    },
    {
      id: 3,
      title: 'Hidden Gems of Nepal: Off the Beaten Path',
      excerpt: 'Explore lesser-known destinations that offer authentic Nepal experiences...',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=250&fit=crop',
      category: 'Destinations',
      author: 'Amit Thapa',
      date: '2024-01-05',
      likes: 28,
      comments: 15,
      readTime: '10 min read'
    },
    {
      id: 4,
      title: 'Nepal Photography Tips: Capturing the Perfect Shot',
      excerpt: 'Professional tips for photographing Nepal\'s stunning landscapes and culture...',
      image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=250&fit=crop',
      category: 'Photography',
      author: 'Sarah Mitchell',
      date: '2023-12-28',
      likes: 51,
      comments: 20,
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Cultural Etiquette: Respecting Local Traditions',
      excerpt: 'Learn about Nepal\'s customs and traditions to be a respectful traveler...',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=250&fit=crop',
      category: 'Culture',
      author: 'Laxmi Shrestha',
      date: '2023-12-20',
      likes: 38,
      comments: 11,
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Adventure Sports in Nepal: Beyond Trekking',
      excerpt: 'Discover thrilling activities from paragliding to white-water rafting...',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop',
      category: 'Adventure',
      author: 'David Kim',
      date: '2023-12-15',
      likes: 42,
      comments: 17,
      readTime: '9 min read'
    }
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Travel Blog</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest travel guides, tips, and stories from Nepal. 
            Our experts share insights to help you plan the perfect adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary/90">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.readTime}</span>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                        likedPosts.includes(post.id) ? 'text-red-500' : ''
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleShare(post)}
                      className="flex items-center space-x-1 hover:text-primary transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Blog Posts</Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
