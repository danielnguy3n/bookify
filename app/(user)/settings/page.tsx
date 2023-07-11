function Settings() {
  return (
    <div className="row">
      <div className="container">
        <div className="settings__title">Settings</div>
        <div className="settings__content">
          <div className="settings__subtitle">Your Subscription Plan</div>
          <div className="settings__desc">Basic</div>
          <button className="btn settings__btn">Upgrade to Premium</button>
        </div>
        <div className="settings__content">
          <div className="settings__subtitle">Email</div>
          <div className="settings__desc">daniel@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
