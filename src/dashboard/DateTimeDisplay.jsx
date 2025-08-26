export default function DateTimeDisplay() {

  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayName = days[now.getDay()];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  let hour = now.getHours();
  const minute = now.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'p.m.' : 'a.m.';
  hour = hour % 12;
  hour = hour ? hour : 12;
  return (
    <div className="mt-6 text-sm text-gray-300">
      {`${dayName}, ${day} ${month} ${year}`}<br />
      {`${hour}.${minute} ${ampm}`}
    </div>
  );
}