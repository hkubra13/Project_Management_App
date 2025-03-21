import './SupportPage.css';

function SupportPage() {
  return (
    <div className="support-page">
      <h2 className="support-title">Support & Help Center</h2>
      <p className="support-intro">
        Need help? Check our FAQs below or contact us directly.
      </p>

      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq">
          <p className="faq-question">❓ How do I reset my password?</p>
          <p className="faq-answer">Go to the sign-in page and click "Forgot Password?". Follow the instructions in the email.</p>
        </div>
        <div className="faq">
          <p className="faq-question">❓ How can I contact support?</p>
          <p className="faq-answer">You can email us at <b>support@yourwebsite.com</b> or call us at <b>+1 234 567 890</b>.</p>
        </div>
        <div className="faq">
          <p className="faq-question">❓ How do I upgrade my plan?</p>
          <p className="faq-answer">Go to the "Plans" page and choose an upgrade option.</p>
        </div>
      </div>

      <div className="contact-section">
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a></p>
        <p>Phone: +1 234 567 890</p>
      </div>
    </div>
  );
}

export default SupportPage;
