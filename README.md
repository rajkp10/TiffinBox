# Group Project - Tiffin Box

Our project’s purpose is to provide a platform through which the food ordering and delivery process becomes easy for both the customers and food service providers. It also has an administrator role to manage the customers and food service providers of the application. Our goal is to enhance the overall food experience by providing a platform for effective order tracking and meal management. With features like tracking deliveries in real-time, earning reward points, and easy-to-use dashboards, we aim to make the experience smooth for everyone.

- _Date Created_: 30 May 2024
- _Last Modification Date_: August 09, 2024
- _Deployment URL_: <https://tiffinbox-csci5709.netlify.app/>
- _Git URL_: <https://git.cs.dal.ca/rkp/csci-5709-grp-04>

## Authors

- [Raj Kamlesh Patel](mailto:rj227488@dal.ca) - _(Full Stack Developer)_
- [Keval Dharmeshbhai Gandevia](mailto:keval.gandevia@dal.ca) - _(Full Stack Developer)_
- [Harsh Maisuri](mailto:hr786278@dal.ca) - _(Full Stack Developer)_
- [Kunj Hiteshkumar Pathak](mailto:kn743706@dal.ca) - _(Full Stack Developer)_
- [Savan Maheshkumar Patel](mailto:sv272995@dal.ca) - _(Full Stack Developer)_
- [Bhavya Mukesh Dave](mailto:bh392017@dal.ca) - _(Full Stack Developer)_

## Getting Started

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following:

- [NodeJS](https://nodejs.org/en) `v20.x`
- [npm](https://www.npmjs.com/) `v10.x`
- [JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) `Java 17`
- [Maven](https://maven.apache.org/)
- [MongoDB](https://www.mongodb.com/products/platform/atlas-database)

### Installing

Clone the Repository

Clone with HTTPS

```bash
 git clone https://git.cs.dal.ca/rkp/csci-5709-grp-04.git
```

OR

Clone with SSH

```bash
git clone git@git.cs.dal.ca:rkp/csci-5709-grp-04.git
```

### Local Setup - Frontend

```
cd csci-5709-grp-04/frontend
npm install
npm run dev
```

Frontend should be running on http://localhost:5173/

### Local Setup - Backend

```
cd csci-5709-grp-08/backend/
mvn spring-boot:run
```

The backend should be running on http://localhost:8080/

## Deployment

This app has been deployed on Netlify (Frontend) and Render (Backend).

- Frontend Deployed App URL: https://tiffinbox-csci5709.netlify.app/
- Backend Deployed App URL: https://tiffin-box.onrender.com

Deployment to Netlify

#### 1. Login to Netlify: Sign up or log in at Netlify.

#### 2. Create a New Site:

- Click "Add new site".
- Connect your GitHub account and select your repository.

#### 3. Configure Settings:

- Base directory: frontend
- Build Command: npm run build
- Publish Directory: /frontend/dist
- Deploy: Click "Deploy site".

## Built With

- [React](https://react.dev/) - The JavaScript library used for building the user interface.
- [Vite](https://vitejs.dev/) - The build tool used for faster and leaner development.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapidly building modern websites.
- [Daisy UI](https://daisyui.com/) - Tailwind CSS component library.
- [npm](https://docs.npmjs.com//) - Dependency Management.
- [Spring Boot](https://spring.io/projects/spring-boot) - The backend framework used
- [Java](https://www.java.com/) - The programming language used
- [Maven](https://maven.apache.org/) - Used as a build tool and for dependency management.
- [Docker](https://www.docker.com/) - Used for containerization.
- [MongoDB](https://www.mongodb.com/atlas/database) - Database used.

## Sources Used

### Navbar.jsx

_Lines 25 - 119_

```
<nav className="max-w-5xl navbar">
    <div className="gap-2 navbar-start">
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
            />
            </svg>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 gap-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
            <li>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Home
            </NavLink>
            </li>
            <li>
            <NavLink
                to="/contact-us"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Contact Us
            </NavLink>
            </li>
            <li>
            <NavLink
                to="/faqs"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                FAQs
            </NavLink>
            </li>
        </ul>
        </div>
        <Link to="/" className="cursor-pointer">
        <img
            src="https://res.cloudinary.com/dk1fim9hl/image/upload/v1719262725/Tiffin%20Box/nldinb3ipt9tegyc2hzs.png"
            alt="tiffin box"
            className="w-10"
        />
        </Link>
    </div>
    <div className="hidden navbar-center lg:flex">
        <ul className="flex gap-8 px-1">
        <li>
            <NavLink
            to="/"
            className={({ isActive }) =>
                isActive ? "text-secondary" : "hover:text-primary transition"
            }
            >
            Home
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/contact-us"
            className={({ isActive }) =>
                isActive ? "text-secondary" : "hover:text-primary transition"
            }
            >
            Contact Us
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/faqs"
            className={({ isActive }) =>
                isActive ? "text-secondary" : "hover:text-primary transition"
            }
            >
            FAQs
            </NavLink>
        </li>
        </ul>
    </div>
    <div className="navbar-end">
        <Link className="text-slate-100 btn btn-secondary">Login</Link>
    </div>
</nav>
```

The code above was created by adapting the code in [Navbar - Daisy UI](https://daisyui.com/components/navbar/) as shown below:

```
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
```

### Footer.jsx

_Lines 5-29_

```
<footer className="p-10 rounded footer footer-center bg-secondary text-accent-content">
    <nav className="grid grid-flow-col gap-4 font-medium">
    <Link to="/" className="link link-hover">
        Home
    </Link>
    <Link to="/contact-us" className="link link-hover">
        Contact
    </Link>
    <Link to="/faqs" className="link link-hover">
        FAQ
    </Link>
    </nav>
    <a>
    <img
        src="https://res.cloudinary.com/dk1fim9hl/image/upload/v1719262725/Tiffin%20Box/nldinb3ipt9tegyc2hzs.png"
        alt="tiffin box"
        className="w-10"
    />
    </a>
    <aside>
    <p className="font-medium">
        Copyright © 2024 - All right reserved by Tiffin Box
    </p>
    </aside>
</footer>
```

The code above was created by adapting the code in [Footer - Daisy UI](https://daisyui.com/components/footer/) as shown below:

```
<footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © ${new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
```

### Hero.jsx

_Lines 7 - 22_

```
<section className="max-w-5xl overflow-hidden rounded-md shadow-md hero h-96 bg-bgHero">
    <div className="hero-overlay bg-opacity-70"></div>
    <div className="text-center hero-content text-neutral-content">
        <div className="max-w-3xl">
        <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            Delicious Home-Cooked Meals
        </h1>
        <h2 className="mb-5 text-2xl font-semibold sm:mb-7 sm:text-2xl">
            Find the best tiffins near you
        </h2>
        <button className="px-8 text-xl text-white btn btn-secondary">
            Explore <BiSolidDish className="w-6 h-6 ml-2" />
        </button>
        </div>
    </div>
</section>
```

The code above was created by adapting the code in [Hero - Daisy UI](https://daisyui.com/components/hero/) as shown below:

```
<div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
```

### SecurityConfiguration.java

- Lines 34 - 49

```
http.csrf(AbstractHttpConfigurer::disable)
               .cors(cors -> cors.configurationSource(corsConfigurationSource()))
               .authorizeHttpRequests(request -> request
                       .requestMatchers("/api/auth/**").permitAll()
                       .requestMatchers("/api/admin/**").hasAnyAuthority(UserRole.ADMIN.name())
                       .requestMatchers("/api/home/**").permitAll()
                       .requestMatchers("/api/meal/**").permitAll()
                       .requestMatchers("/api/orders/**").authenticated()
                       .requestMatchers("/api/foodserviceprovider/**").authenticated()
                       .requestMatchers("/api/ordertrack/**").authenticated()
                       .requestMatchers("/api/subscription/**").authenticated()
                       .anyRequest().authenticated()
               ).sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authenticationProvider(authenticationProvider)
               .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

```

The code above was created by adapting the code in [Ali Bouli Github](https://github.com/ali-bouali/spring-boot-3-jwt-security/blob/main/src/main/java/com/alibou/security/config/SecurityConfiguration.java) as shown below:

```
http
  .csrf(AbstractHttpConfigurer::disable)
  .authorizeHttpRequests(req ->
          req.requestMatchers(WHITE_LIST_URL)
                  .permitAll()
                  .requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), MANAGER.name())
                  .requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name())
                  .requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name())
                  .requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN_UPDATE.name(), MANAGER_UPDATE.name())
                  .requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(ADMIN_DELETE.name(), MANAGER_DELETE.name())
                  .anyRequest()
                  .authenticated()
  )
  .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
  .authenticationProvider(authenticationProvider)
  .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
  .logout(logout ->
          logout.logoutUrl("/api/v1/auth/logout")
                  .addLogoutHandler(logoutHandler)
                  .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
  )
;

return http.build();
```

- The code in [Ali Bouli Github](https://github.com/ali-bouali/spring-boot-3-jwt-security/blob/main/src/main/java/com/alibou/security/config/SecurityConfiguration.java) was taken as a reference from github repository.
- [Ali Bouli Github](https://github.com/ali-bouali/spring-boot-3-jwt-security/blob/main/src/main/java/com/alibou/security/config/SecurityConfiguration.java) This code was used to implement security configuration file.
- [Ali Bouli Github](https://github.com/ali-bouali/spring-boot-3-jwt-security/blob/main/src/main/java/com/alibou/security/config/SecurityConfiguration.java) This code was modified by removing the logout feature and modified accoording to our feature.

### AdminDashboard.jsx

- Lines 16 - 39

```
<div className="card bg-base-100 shadow-md">
  <div className="card-body">
    <h1 className="card-title text-3xl">
      <p className="text-center">Total Users</p>
    </h1>
    <p className="font-semibold text-center">{analysisDetails?.totalUsers || 0}</p>
  </div>
</div>
<div className="card w-50 bg-base-100 shadow-md">
  <div className="card-body">
    <h1 className="card-title text-3xl">
      <p className="text-center">Total Orders</p>
    </h1>
    <p className="font-semibold text-center">{analysisDetails?.totalOrders || 0}</p>
  </div>
</div>
<div className="card w-50 bg-base-100 shadow-md">
  <div className="card-body">
    <h1 className="card-title text-3xl">
      <p className="text-center">Total Earnings</p>
    </h1>
    <p className="font-semibold text-center">${analysisDetails?.totalEarnings || 0}</p>
  </div>
</div>
```

The code above was created by adapting the code in [daisyUI](https://daisyui.com/components/card/) as shown below:

```
<div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
```

- The code in [daisyUI](https://daisyui.com/components/card/) was taken as a reference from the official documentation.
- [daisyUI](https://daisyui.com/components/card/) This code was used to implement responsive card components with grids defined by me.
- [daisyUI](https://daisyui.com/components/card/) This code was modified by changing internal elements such as I have removed the actions, changing the title, and so on.

### PendingRequest.jsx

- Lines 64 - 101

```
<div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Company</th>
        <th>Email</th>
        <th>Contact Number</th>
        <th>View</th>
      </tr>
    </thead>
    <tbody>
      {filteredRows.map((item) => (
        <tr key={item.userId}>
          <td>{item.name}</td>
          <td>{item.companyName}</td>
          <td>{item.email}</td>
          <td>{item.contact}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => handleViewClick(item)}
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {filteredRows.length === 0 ? (
    <h1 className="text-xl text-center font-bold my-2">
      No Pending Requests!
    </h1>
    ) : (
      <></>
  )}
</div>
```

The code above was created by adapting the code in [daisyUI](https://daisyui.com/components/table/) as shown below:

```
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
```

- The code in [daisyUI](https://daisyui.com/components/table/) was taken as a reference from the official documentation.
- [daisyUI](https://daisyui.com/components/table/) This code was used to implement table as per needed attributes.
- [daisyUI](https://daisyui.com/components/table/) This code was modified by changing the dummy rows. I have used the map function of JavaScript to display rows. And conditional logic is added to display rows.

### ViewReceivedOrdersPage.jsx

- Lines 64 - 101

```
<table className="table">
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Customer Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredRows.length !== 0 &&
      filteredRows.map((order) => (
        <tr key={order.orderId}>
          <td>{order.orderId}</td>
          <td>{order.customerName}</td>
          <td>
            <Link
              to={`/foodprovider/received-orders/${order.orderId}`}
              className="btn btn-neutral"
            >
              View
            </Link>
          </td>
        </tr>
      ))}
  </tbody>
</table>
```

The code above was created by adapting the code in [daisyUI](https://daisyui.com/components/table/) as shown below:

```
<table className="table">
  {/* head */}
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Job</th>
      <th>Favorite Color</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    <tr>
      <th>1</th>
      <td>Cy Ganderton</td>
      <td>Quality Control Specialist</td>
      <td>Blue</td>
    </tr>
    {/* row 2 */}
    <tr>
      <th>2</th>
      <td>Hart Hagerty</td>
      <td>Desktop Support Technician</td>
      <td>Purple</td>
    </tr>
    {/* row 3 */}
    <tr>
      <th>3</th>
      <td>Brice Swyre</td>
      <td>Tax Accountant</td>
      <td>Red</td>
    </tr>
  </tbody>
</table>
```

- The code in [daisyUI](https://daisyui.com/components/table/) was taken as a reference from the official documentation.
- [daisyUI](https://daisyui.com/components/table/) This code was used to implement table as per needed attributes.
- [daisyUI](https://daisyui.com/components/table/) This code was modified by changing the dummy rows. I have used the map function of JavaScript to display rows. And conditional logic is added to display rows.

### ReviewController.java

_Line 35 - 40_

```

 @PostMapping("/addReview")
    public ResponseEntity<BasicResponse> addReview(@Valid @RequestBody ReviewRequest reviewRequest, Principal principal) {
        BasicResponse savedReview = reviewService.addReview(reviewRequest,principal);
        return ResponseEntity.status(HttpStatus.OK).body(savedReview);
    }

```

The code above was created by adapting the code from [How does Spring Security inject principal into Controller?](https://stackoverflow.com/questions/60751605/how-does-spring-security-inject-principal-into-controller) as shown below:

```
@Nullable
private Object resolveArgument(Class<?> paramType, HttpServletRequest request) throws IOException {
    //omitted......
    else if (Principal.class.isAssignableFrom(paramType)) {
        Principal userPrincipal = request.getUserPrincipal();
        if (userPrincipal != null && !paramType.isInstance(userPrincipal)) {
            throw new IllegalStateException(
                    "Current user principal is not of type [" + paramType.getName() + "]: " + userPrincipal);
        }
        return userPrincipal;
    }
    //omitted......
}
```

- The code in [How does Spring Security inject principal into Controller?](https://stackoverflow.com/questions/60751605/how-does-spring-security-inject-principal-into-controller) provided by [Holinc](https://stackoverflow.com/users/7334180/holinc) was implemented by propely understanding the working of java functions such as streams(), map() and filter(). After Understanding, I have modified the code as per my requirement.

- The code example discussed in [How does Spring Security inject principal into Controller?](https://stackoverflow.com/questions/60751605/how-does-spring-security-inject-principal-into-controller) provided by [Holinc](https://stackoverflow.com/users/7334180/holinc) was instrumental in illustrating how Spring Security injects the Principal into a controller. By thoroughly understanding how Java functions such as streams(), map(), and filter() work, I was able to adapt the example to fit my specific needs.

- [How does Spring Security inject principal into Controller?](https://stackoverflow.com/questions/60751605/how-does-spring-security-inject-principal-into-controller)'s Code provided by [Holinc](https://stackoverflow.com/users/7334180/holinc) was used because it gave me the idea on how to filter out FoodProviders based on provided search filter.

- [How does Spring Security inject principal into Controller?](https://stackoverflow.com/questions/60751605/how-does-spring-security-inject-principal-into-controller)'s Code provided by [Holinc](https://stackoverflow.com/users/7334180/holinc) was modified by using the Principal as the parameter in the Controller.

### ReviewServiceImpl.java

_Line 69-78_

```
List<Review> reviews = reviewRepository.findAllByFoodServiceProvider(foodServiceProvider.get());
return reviews.stream().map(review -> {
    ReviewResponse response = new ReviewResponse();
    response.setReviewDescription(review.getReviewDescription());
    response.setReviewStars(review.getReviewStars());
    response.setFirstName(review.getCustomer().getFirstName());
    response.setLastName(review.getCustomer().getLastName());
    return response;
}).collect(Collectors.toList());

```

The code above was created by adapting the code in [Mapping stream in DTO or passing mapped value to DTO separately?](https://stackoverflow.com/questions/75503819/mapping-stream-in-dto-or-passing-mapped-value-to-dto-separately) as shown below:

```
public RecipeResponse findById(Long id) {

    return recipeRepository.findById(id).map(recipe -> {

        RecipeResponse recipeResponse = new RecipeResponse();
        recipeResponse.setId(id);
        recipeResponse.setTitle(recipe.getTitle());

        recipeResponse.setIngredients(
                recipe.getRecipeIngredients().stream().map((recipeIngredient) -> {
                    RecipeIngredientResponse recipeIngredientResponse = new RecipeIngredientResponse();
                    // set the RecipeIngredientResponse properties here
                    return recipeIngredientResponse;
                }).collect(Collectors.toList()));

        return new RecipeResponse();
    }).orElseThrow(() -> new NoSuchElementFoundException("Not found"));
}
```

- [Mapping stream in DTO or passing mapped value to DTO separately?](https://stackoverflow.com/questions/75503819/mapping-stream-in-dto-or-passing-mapped-value-to-dto-separately) was implemented by properly reading the original source and understanding how mapping is used to return the response dto.

- [Mapping stream in DTO or passing mapped value to DTO separately?](https://stackoverflow.com/questions/75503819/mapping-stream-in-dto-or-passing-mapped-value-to-dto-separately)'s code was used because it helped me return the response using the .stream().map().

- [Mapping stream in DTO or passing mapped value to DTO separately?](https://stackoverflow.com/questions/75503819/mapping-stream-in-dto-or-passing-mapped-value-to-dto-separate)'s Code was modified by adding other variables for the response object.

### SubmitReview.jsx

_Line 54 - 58_

```
try {
    const abc= await api.post('http://localhost:8080/api/reviews/addReview', reviewData);
    console.log(abc)
    toast.success('Your review has been successfully submitted.', {
    position: "top-center",
    duration: 2000
    });
}
```

The code above was created by adapting the code in [How to Make POST Requests with Axios](https://apidog.com/articles/axios-send-post-request/) as shown below:

```
  axios.post('https://api.example.com/post-endpoint', {key1: 'value1',key2: 'value2',
}, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  },
})
  .then(response => {console.log('Response:', response.data);
  })
  .catch(error => {console.error('Error:', error);
  });

```

- [How to Make POST Requests with Axios](https://apidog.com/articles/axios-send-post-request/) was implemented by properly reading the original source and understanding how to make the post requests using the axios.

- [How to Make POST Requests with Axios](https://apidog.com/articles/axios-send-post-request/)'s Code was used because because it helped to make the axios post requiest which was used to fetch the data from the back end.

- [How to Make POST Requests with Axios](https://apidog.com/articles/axios-send-post-request/)'s Code was modified by adding the authorization bearer token.

### ViewProfileSeller.jsx

_Lines 35 - 45_

```
const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    updateProfileImage(e.target.files[0]);
  };

```

- The code above was created by adapting code generated by chat gpt [Chatgpt](https://chatgpt.com/)
- ChatGPT Prompt: Write a React function to handle and preview an uploaded image.

### EditProfileSeller.jsx

_Lines 107 - 132_

```
<div className="flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4">
    <div className="w-full flex flex-col">
    <label htmlFor="email">Email</label>
    <input
        type="email"
        name="email"
        placeholder="Email"
        readOnly
        className="input input-bordered w-full mt-4"
        value={"email"}
        onChange={handleChange}
    />
    </div>

    <div className="w-full flex flex-col">
    <label htmlFor="contact">Contact</label>
    <input
        type="tel"
        name="contact"
        placeholder="Contact"
        className="input input-bordered w-full mt-4"
        value={"123456789"}
        onChange={handleChange}
    />
    </div>
</div>
```

- The code above was created by adapting code generated by chat gpt [Chatgpt](https://chatgpt.com/)
- ChatGPT Prompt: Create a responsive React form with email and contact fields, supporting both mobile and desktop layouts using Tailwind CSS.

### CustomerServiceImpl.java

_Line 46 - 48_

```

foodProviderResponseDTOList = sellerRepository.findByCity(city).stream()
                    .map(this::convertToFoodProviderDTO)
                    .filter(foodProviderResponseDTO ->
                        foodProviderResponseDTO.getCuisineType()
                       .contains(searchFoodProviderRequest.getCuisineType()))
                    .toList();
```

The code above was created by adapting the code from [Stack Overflow's chat threaad](https://stackoverflow.com/questions/75896970/how-can-i-be-able-to-perform-a-filter-on-a-nested-list-within-another-java-list) as shown below:

```
List<YearBrandDTO> years = yearRepository.findAll().stream()
    .map(year -> {
        List<Brand> filteredBrands = year.getBrands().stream()
            .filter(brand -> brand.getName().equals("Toyota"))
            .collect(Collectors.toList());
```

- The code in [Stack Overflow's chat thread](https://stackoverflow.com/questions/75896970/how-can-i-be-able-to-perform-a-filter-on-a-nested-list-within-another-java-list) provided by [devblack-exe User](https://stackoverflow.com/users/14738350/devblack-exe) was implemented by propely understanding the working of java functions such as streams(), map() and filter(). After Understanding, I have modified the code as per my requirement.

- [Stack Overflow's chat thread](https://stackoverflow.com/questions/75896970/how-can-i-be-able-to-perform-a-filter-on-a-nested-list-within-another-java-list)'s Code provided by [devblack-exe User](https://stackoverflow.com/users/14738350/devblack-exe) was used because it gave me the idea on how to filter out FoodProviders based on provided search filter.

- [Stack Overflow's chat thread](https://stackoverflow.com/questions/75896970/how-can-i-be-able-to-perform-a-filter-on-a-nested-list-within-another-java-list)'s Code provided by [devblack-exe User](https://stackoverflow.com/users/14738350/devblack-exe) was modified by using the combination of map() and filter() function together to meet the requirement.

### FoodServiceProviderController.java

_Line 41 - 47_

```
@RequestPart("mealImage") MultipartFile mealImage,
@RequestPart("mealName") String mealName,
@RequestPart("mealDescription") String mealDescription,
@RequestPart("mealPrice") String mealPrice,
@RequestPart("mealType") String mealType,
@RequestPart("cuisineType") String cuisineType
```

The code above was created by adapting the code in [Multipart File with Springboot](https://medium.com/techpanel/multipartfile-with-springboot-d4901ee3e77d) as shown below:

```
public ResponseEntity<String> uploadFile(@RequestPart(value = "file") MultipartFile file) {
  service.uploadFile(file);
  return new ResponseEntity<>("success", HttpStatus.OK);
}
```

- [Multipart File with Springboot](https://medium.com/techpanel/multipartfile-with-springboot-d4901ee3e77d) was implemented by properly reading the original source and understanding how Multipart files are recieved in the backend.

- [Multipart File with Springboot](https://medium.com/techpanel/multipartfile-with-springboot-d4901ee3e77d)'s Code was used because it provided the option to handle image upload without needing to convert the image to base64. This option also decreases frontEnd work as files will be passed to backend as they are uploaded by User.

- [Multipart File with Springboot](https://medium.com/techpanel/multipartfile-with-springboot-d4901ee3e77d)'s Code was modified by also accepting other details about meals such as mealName, mealDescription etc as part of the formData.

### AddAMeal.jsx

_Line 24 - 35_

```
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setMealData({ ...mealData, mealImage: file });
    console.log(e.target.files[0]);
  };
```

_Line 78-87_

```
{preview && (
            <div className="mt-4">
              <p className="text-md font-bold text-gray-600">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
```

The code above was created by adapting the code in [How to display preview of an image in React](https://nikolasbarwicki.com/articles/how-to-display-a-preview-of-an-image-upload-in-react/) as shown below:

```
useEffect(() => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
}, [file])
return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {previewUrl && <img src={previewUrl} alt="Preview" />}
    </>
  )
}
```

### axiosConfig.jsx

```
// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/refresh-token', { refreshToken });
        const { token } = response.data;

        localStorage.setItem('token', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
```

The code above was developed using the code below as reference to setup the frontend for the refresh token [medium](https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app)

```
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
```

- The code in [daisyUI](https://daisyui.com/components/table/) was taken as a reference from the official documentation.
- [daisyUI](https://daisyui.com/components/table/) This code was used to implement table as per needed attributes.
- [daisyUI](https://daisyui.com/components/table/) This code was modified by changing the dummy rows. I have used the map function of JavaScript to display rows. And conditional logic is added to display rows.
- I want to extend my gratitude to the creators and developers of the sources mentioned above. Their ideas and it's implementation really helped me to complete as well as provide some additional functionality to my feature. It helped in creating the better User Experience.
- This Article named [How to implement search...](https://www.geeksforgeeks.org/how-to-implement-search-filter-functionality-in-reactjs/) on GeeksForGeeks gave me idea of how to implement Search Functionality in ReactJs FrontEnd.

## Acknowledgments

- Spring Boot
- Render
- Docker
- ViteJS
- daisyUI
- Tailwind CSS
- MongoDB Atlas
- Netlify
- Cloudinary
