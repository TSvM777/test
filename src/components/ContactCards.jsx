export default function ContactCards({ contactList }) {
  return (
    <>
      {contactList?.map((contact) => (
        <figure key={contact.email} className="bg-white h-80 rounded-lg shadow-md pt-7">
          <img alt="user" src={contact.picture.large} className="w-32 h-32 rounded-full mx-auto" />
          <figcaption className="text-center mt-5">
            <p className="text-xl text-gray-700 font-semibold mb-2">
              {contact.name.first}
              {' '}
              {contact.name.last}
            </p>
            <p className="text-gray-500">
              <span className="font-medium p-1">email:</span>
              {contact.email}
            </p>
          </figcaption>
        </figure>
      ))}
    </>
  );
}
