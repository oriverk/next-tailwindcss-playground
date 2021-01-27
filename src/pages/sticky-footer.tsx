import React from 'react';

const sticky = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="container mx-auto px-4">
          <h1 className="my-6 text-center text-2xl font-bold">Sticky Footer with Tailwind CSS</h1>
          <p className="my-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam purus risus, venenatis non arcu at, dictum euismod risus. Pellentesque faucibus dui sit amet eleifend gravida. Praesent dapibus sapien sit amet mauris tempor ultrices non luctus tellus.
            </p>
        </section>
      </main>
      <footer className="bg-blue-200">
        <p className="p-2 text-center text-xs">Copyright © 2019 Webty, inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default sticky
