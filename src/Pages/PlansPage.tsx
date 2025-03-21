import './PlansPage.css';

function PlansPage() {
  const plans = [
    {
      title: 'Free Plan',
      price: '$0/month',
      description: 'Basic features for individuals.',
      features: ['✔️ Unlimited Tasks', '✔️ 1 Project', '✔️ Basic Support'],
    },
    {
      title: 'Pro Plan',
      price: '$9.99/month',
      description: 'Advanced features for professionals.',
      features: ['✔️ Unlimited Projects', '✔️ Collaboration Tools', '✔️ Priority Support', '✔️ File Attachments', '✔️ Custom Labels'],
    },
    {
      title: 'Enterprise Plan',
      price: 'Custom Pricing',
      description: 'Tailored solutions for businesses.',
      features: ['✔️ Dedicated Account Manager', '✔️ Advanced Security', '✔️ 24/7 Support', '✔️ Team Management', '✔️ Custom Integrations', '✔️ SSO & 2FA'],
    },
  ];

  return (
    <div className="plans-page">
      <h2 className="plans-title">Choose Your Plan</h2>
      <div className="plans-container">
        {plans.map((plan, index) => (
          <div key={index} className="plan-board">
            <h3>{plan.title}</h3>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-features">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="plan-card">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlansPage;

