import jwt from "jsonwebtoken";
import mg from "mailgun-js";
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET || "hieu",
    {
      expiresIn: "30d"
    }
  );
};
export const qrToken = () => {
  return jwt.sign(
    {
      name: "qrtoken",
      email: "qrtoken@gmail.com"
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET || "hieu",
    {
      expiresIn: "30d"
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // 7 is bearer
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET || "hieu", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "invalid token" });
      } else {
        req.user = decode;
        // console.log(req.user);
        // console.log(decode);
        next();
      }
    });
  } else {
    res.status(401).send({ message: "no Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
export const mailgun = () =>
  mg({
    // eslint-disable-next-line no-undef
    apiKey: "e346af107151a38d951c0e0aaf59a885-2ac825a1-f37ebc5a",
    // eslint-disable-next-line no-undef
    domain: "sandbox14597c3299014e018946274b96913514.mailgun.org"
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join("\n")}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};
