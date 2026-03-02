import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  type QuizScore = {
    subject : Text;
    score : Nat;
    timestamp : Nat;
  };

  public type Student = {
    name : Text;
    streakCount : Nat;
    quizScores : List.List<QuizScore>;
    badges : List.List<Text>;
  };

  public type StudentView = {
    name : Text;
    streakCount : Nat;
    quizScores : [QuizScore];
    badges : [Text];
  };

  func studentToView(student : Student) : StudentView {
    {
      name = student.name;
      streakCount = student.streakCount;
      quizScores = student.quizScores.toArray();
      badges = student.badges.toArray();
    };
  };

  func compareByStreakCount(s1 : StudentView, s2 : StudentView) : Order.Order {
    Int.compare(
      Int.fromNat(s2.streakCount),
      Int.fromNat(s1.streakCount),
    );
  };

  let students = Map.empty<Principal, Student>();

  public shared ({ caller }) func addStudent() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add students");
    };
    switch (students.get(caller)) {
      case (?_) { Runtime.trap("Student already exists") };
      case (null) {
        switch (userProfiles.get(caller)) {
          case (null) { Runtime.trap("User profile not found") };
          case (?profile) {
            let newStudent : Student = {
              name = profile.name;
              streakCount = 0;
              quizScores = List.empty<QuizScore>();
              badges = List.empty<Text>();
            };
            students.add(caller, newStudent);
          };
        };
      };
    };
  };

  public query ({ caller }) func getStudent(user : Principal) : async ?StudentView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get student data");
    };
    switch (students.get(user)) {
      case (null) { null };
      case (?student) { ?studentToView(student) };
    };
  };

  public shared ({ caller }) func updateStreak(newStreak : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update streaks");
    };
    switch (students.get(caller)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let updatedStudent = { student with streakCount = newStreak };
        students.add(caller, updatedStudent);
      };
    };
  };

  public shared ({ caller }) func saveQuizScore(subject : Text, score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save quiz scores");
    };
    switch (students.get(caller)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let newQuizScore : QuizScore = {
          subject;
          score;
          timestamp = 0;
        };
        student.quizScores.add(newQuizScore);
        let updatedStudent = { student with quizScores = student.quizScores };
        students.add(caller, updatedStudent);
      };
    };
  };

  public query func getLeaderboard() : async [StudentView] {
    let views = students.values().map(studentToView).toArray();
    views.sort(compareByStreakCount);
  };
};
