import './FeaturesPage.css';

function FeaturesPage() {
  const features = [
    {
      title: 'Task Management',
      description: 'Manage tasks with ease, drag and drop to organize.',
      icon: '🔲',
    },
    {
      title: 'Collaboration',
      description: 'Collaborate with your team in real-time.',
      icon: '🤝',
    },
    {
      title: 'Attachments',
      description: 'Attach files and images to tasks for better clarity.',
      icon: '📎',
    },
    {
      title: 'Task Prioritization',
      description: 'Prioritize tasks for efficient workflow.',
      icon: '🚦',
    },
    {
      title: 'Real-time Updates',
      description: 'Get instant updates on task progress.',
      icon: '⚡',
    },
    {
      title: 'Customizable Views',
      description: 'Customize your view to fit your preferences.',
      icon: '👀',
    },
    {
      title: 'Time Tracking',
      description: 'Track the time spent on tasks for better management.',
      icon: '⏱️',
    },
    {
      title: 'Mobile Support',
      description: 'Access tasks and manage projects on the go.',
      icon: '📱',
    },
  ];

  return (
    <div className="features-page">
      <h2 className="features-title">Our Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesPage;


