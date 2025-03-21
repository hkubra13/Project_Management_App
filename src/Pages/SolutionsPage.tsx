import './SolutionsPage.css';

function SolutionsPage() {
  const solutions = [
    {
      title: 'Project Management',
      description: 'Manage projects and tasks with ease.',
      lists: [
        {
          title: 'Backlog',
          cards: [
            { title: 'Research', description: 'Do research for the project.' },
            { title: 'Define Scope', description: 'Define the scope of the project.' },
          ],
        },
        {
          title: 'In Progress',
          cards: [
            { title: 'Design', description: 'Design the user interface.' },
          ],
        },
        {
          title: 'Completed',
          cards: [
            { title: 'Launch', description: 'Launch the project to the public.' },
          ],
        },
      ],
    },
    {
      title: 'Task Management',
      description: 'Create and manage tasks efficiently.',
      lists: [
        {
          title: 'To Do',
          cards: [
            { title: 'Write Documentation', description: 'Create user guides.' },
            { title: 'Setup Database', description: 'Setup the project database.' },
          ],
        },
        {
          title: 'Doing',
          cards: [
            { title: 'Code Review', description: 'Review the pull requests.' },
          ],
        },
        {
          title: 'Done',
          cards: [
            { title: 'Testing', description: 'Test the application.' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="solutions-page">
      <h2 className="solutions-title">Our Solutions</h2>
      <div className="solutions-container">
        {solutions.map((solution, index) => (
          <div key={index} className="solution-board">
            <h3 className="solution-title">{solution.title}</h3>
            <p className="solution-description">{solution.description}</p>
            <div className="solution-lists">
              {solution.lists.map((list, listIndex) => (
                <div key={listIndex} className="solution-list">
                  <h4>{list.title}</h4>
                  <div className="solution-cards">
                    {list.cards.map((card, cardIndex) => (
                      <div key={cardIndex} className="solution-card">
                        <h5>{card.title}</h5>
                        <p>{card.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionsPage;
