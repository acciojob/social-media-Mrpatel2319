// App.js
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import UsersPage from './components/UsersPage';
import NotificationsPage from './components/NotificationsPage';
import CreatePost from './components/CreatePost';
import './App.css';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);

  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      ...postData,
      reactions: 0,
      timestamp: new Date()
    };
    setPosts([...posts, newPost]);
    
    // Add notification
    const notification = {
      id: notifications.length + 1,
      message: `New post created by ${postData.author}`
    };
    setNotifications([...notifications, notification]);
  };

  const handleEditPost = (postId, updatedPost) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);

    // Add notification
    const notification = {
      id: notifications.length + 1,
      message: `Post edited by ${updatedPost.author}`
    };
    setNotifications([...notifications, notification]);
  };

  const handleReactToPost = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, reactions: (post.reactions || 0) + 1 } 
        : post
    );
    setPosts(updatedPosts);
  };

  const refreshNotifications = () => {
    // Simulate fetching new notifications
    const newNotifications = [
      { id: notifications.length + 1, message: 'New activity detected' }
    ];
    setNotifications([...notifications, ...newNotifications]);
  };

  return (
    <div className="App">
      <div className="tabs">
        <LandingPage 
          posts={posts} 
          users={users}
          onReactToPost={handleReactToPost}
          onEditPost={handleEditPost}
        />
        <UsersPage 
          users={users} 
          posts={posts}
        <span class="ml-2" /><span class="inline-block w-3 h-3 rounded-full bg-neutral-a12 align-middle mb-[0.1rem]" />
