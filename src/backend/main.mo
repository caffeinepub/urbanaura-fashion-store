import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let products = Map.empty<Nat, Product>();
  let productReviews = Map.empty<Nat, List.List<Review>>();
  let userCarts = Map.empty<Principal, List.List<CartItem>>();
  let userWishlist = Map.empty<Principal, List.List<Nat>>();
  let userOrders = Map.empty<Principal, List.List<Order>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextOrderId = 1;

  public type Category = {
    #tops;
    #dresses;
    #coOrds;
    #casualWear;
    #newArrivals;
    #partyWear;
  };

  public type Product = {
    id : Nat;
    name : Text;
    category : Category;
    price : Nat;
    originalPrice : Nat;
    imageUrls : [Text];
    availableSizes : [Text];
    stockCount : Nat;
    isNew : Bool;
    isTrending : Bool;
    averageRating : Float;
    reviewCount : Nat;
  };

  public type CartItem = {
    productId : Nat;
    size : Text;
    quantity : Nat;
  };

  public type Review = {
    productId : Nat;
    reviewerName : Text;
    rating : Nat;
    comment : Text;
  };

  public type Order = {
    id : Nat;
    items : [CartItem];
    totalAmount : Nat;
    paymentMethod : {
      #cod;
      #upi;
    };
    deliveryAddress : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func getProductById(productId : Nat) : async ?Product {
    products.get(productId);
  };

  public shared ({ caller }) func addToCart(item : CartItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };
    let cart = switch (userCarts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?items) { items };
    };
    cart.add(item);
    userCarts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat, size : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from cart");
    };
    switch (userCarts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let filteredCart = cart.filter(
          func(item) {
            not (item.productId == productId and item.size == size);
          }
        );
        userCarts.add(caller, filteredCart);
      };
    };
  };

  public shared ({ caller }) func updateCartItem(item : CartItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart");
    };
    switch (userCarts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let filteredCart = cart.filter(
          func(cartItem) {
            not (cartItem.productId == item.productId and cartItem.size == item.size);
          }
        );
        filteredCart.add(item);
        userCarts.add(caller, filteredCart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };
    userCarts.remove(caller);
  };

  public query ({ caller }) func getCartItems() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };
    switch (userCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func addToWishlist(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to wishlist");
    };
    let wishlist = switch (userWishlist.get(caller)) {
      case (null) { List.empty<Nat>() };
      case (?items) { items };
    };
    wishlist.add(productId);
    userWishlist.add(caller, wishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from wishlist");
    };
    switch (userWishlist.get(caller)) {
      case (null) { Runtime.trap("Wishlist not found") };
      case (?wishlist) {
        let filteredWishlist = wishlist.filter(
          func(id) { id != productId }
        );
        userWishlist.add(caller, filteredWishlist);
      };
    };
  };

  public query ({ caller }) func getWishlist() : async [Nat] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wishlist");
    };
    switch (userWishlist.get(caller)) {
      case (null) { [] };
      case (?wishlist) { wishlist.toArray() };
    };
  };

  public shared ({ caller }) func addReview(review : Review) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };

    if (review.rating < 1 or review.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let reviews = switch (productReviews.get(review.productId)) {
      case (null) { List.empty<Review>() };
      case (?items) { items };
    };

    reviews.add(review);
    productReviews.add(review.productId, reviews);

    let product = switch (products.get(review.productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let reviewArray = reviews.toArray();
    let totalRatings : Nat = reviewArray.foldLeft(
      0,
      func(acc, r) { acc + r.rating },
    );
    var averageRating : Float = 0;
    if (reviews.size() > 0) {
      averageRating := totalRatings.toFloat() / reviews.size().toInt().toFloat();
    };

    let updatedProduct : Product = {
      product with
      averageRating;
      reviewCount = reviews.size();
    };

    products.add(review.productId, updatedProduct);
  };

  public query ({ caller }) func getReviews(productId : Nat) : async [Review] {
    switch (productReviews.get(productId)) {
      case (null) { [] };
      case (?reviews) { reviews.toArray() };
    };
  };

  public shared ({ caller }) func placeOrder(
    items : [CartItem],
    totalAmount : Nat,
    paymentMethod : { #cod; #upi },
    deliveryAddress : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let order : Order = {
      id = nextOrderId;
      items;
      totalAmount;
      paymentMethod;
      deliveryAddress;
    };

    let orders = switch (userOrders.get(caller)) {
      case (null) { List.empty<Order>() };
      case (?items) { items };
    };
    orders.add(order);
    userOrders.add(caller, orders);

    nextOrderId += 1;
  };

  public query ({ caller }) func getOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    switch (userOrders.get(caller)) {
      case (null) { [] };
      case (?orders) { orders.toArray() };
    };
  };
};
