import './HomePage.css'
import { FaCheckCircle } from "react-icons/fa";


function HomePage() {
  return (
    <>
      <div className="bg-gray-50">
        <section className="hero">
          <h1>Organize Your Work, Your Way</h1>
          <p>Manage your tasks and collaborate effortlessly with your team.</p>
          <p>With powerful task management features, real-time collaboration tools, and easy-to-use interfaces, you can improve productivity and stay on track with your goals.</p>
          <p>Start organizing your work today and streamline your processes. Whether you're a team of one or a large group, our solution is designed for all kinds of users.</p>
        </section>

        <section className="features">
          <div className="feature-box">
            <FaCheckCircle className="text-blue-600 text-4xl mx-auto" />
            <h2>Task Management</h2>
            <p>Organize tasks efficiently using Kanban boards.</p>
          </div>
          <div className="feature-box">
            <FaCheckCircle className="text-blue-600 text-4xl mx-auto" />
            <h2>Team Collaboration</h2>
            <p>Seamlessly collaborate with your team in real time.</p>
          </div>
          <div className="feature-box">
            <FaCheckCircle className="text-blue-600 text-4xl mx-auto" />
            <h2>Task Prioritization</h2>
            <p>Easily prioritize tasks to focus on what matters most.</p>
          </div>
        </section>

        <section className="cta">
          <h2>Start organizing your tasks today!</h2>
          <p>Get started now and experience the difference. With our intuitive platform, you'll be able to boost your team's efficiency in no time.</p>
          <p>Don't wait! Join thousands of users who are already improving their workflow.</p>
        </section>
      </div>
    </>
  )
}

export default HomePage